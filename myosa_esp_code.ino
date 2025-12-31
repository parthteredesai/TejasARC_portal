#include <WiFi.h>
#include <HTTPClient.h>
#include <Wire.h>
#include <oled.h>
#include <Adafruit_BMP085.h>
#include <Adafruit_BME280.h>
#include <Adafruit_INA219.h>
#include <BH1750.h>
#include <LightProximityAndGesture.h>
#include <Adafruit_MPU6050.h>
#include <Adafruit_Sensor.h>
#include <OneWire.h>
#include <DallasTemperature.h>
#include <ArduinoJson.h>
const char* ssid = "Dishita";       
const char* password = "18273645";  
const char* serverUrl = "http://10.114.234.128:5000/sync"; 

#define PM25_VO_PIN 34
#define PM25_LED_PIN 4
#define ONE_WIRE_BUS 27
oLed display(SCREEN_WIDTH, SCREEN_HEIGHT);

Adafruit_BMP085 bmp180;
Adafruit_BME280 bme280;
Adafruit_INA219 ina219;
BH1750 lightMeter;
Adafruit_MPU6050 mpu;
LightProximityAndGesture Lpg;
OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature panelTemp(&oneWire);

uint16_t *rgbProportion;
float lastX = 0, lastY = 0, lastZ = 0;
String aiCause = "Syncing..."; 
void setup() {
  Serial.begin(115200);
  delay(2000);

  // --- WiFi Connection ---
  Serial.print("Connecting to WiFi...");
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWiFi Connected!");

  Wire.begin(21, 22);
  Wire.setClock(100000);
  pinMode(PM25_LED_PIN, OUTPUT);
  
  if(!display.begin()) {
    Serial.println("SSD1306 allocation failed");
  } else {
    display.clearDisplay();
    display.setTextSize(1);
    display.setTextColor(SSD1306_WHITE);
    display.setCursor(0, 0);
    display.println("TEJAS ARK SYSTEM");
    display.println("AI SENSORS READY...");
    display.display(); 
    delay(1000);
  }
  bmp180.begin();
  bme280.begin(0x76);
  ina219.begin();
  lightMeter.begin(BH1750::CONTINUOUS_HIGH_RES_MODE);
  
  while (!Lpg.begin()) {
    Serial.println("APDS9960 disconnected...");
    delay(500);
  }
  
  Lpg.enableAmbientLightSensor(DISABLE); 
  Lpg.enableProximitySensor(DISABLE);
  Lpg.setProximityGain(PGAIN_2X);

  mpu.begin(0x69);
  panelTemp.begin();

  Serial.println("\n--- SOLAR PANEL MONITOR READY ---");
}

void loop() {
  sensors_event_t accel, gyro, temp;
  mpu.getEvent(&accel, &gyro, &temp);
  
  float tiltAngle = acos(constrain(accel.acceleration.z / 9.81, -1.0, 1.0)) * 180 / PI;
  float delta = abs(accel.acceleration.x - lastX) + abs(accel.acceleration.y - lastY) + abs(accel.acceleration.z - lastZ);

  String motionStatus;
  if (delta < 0.1) motionStatus = "Stable";
  else if (delta < 0.13) motionStatus = "Tampering";
  else motionStatus = "Intense";

  lastX = accel.acceleration.x;
  lastY = accel.acceleration.y;
  lastZ = accel.acceleration.z;

  // 2. Read Sensors
  digitalWrite(PM25_LED_PIN, LOW);
  delayMicroseconds(280);
  int pmValue = analogRead(PM25_VO_PIN);
  delayMicroseconds(40);
  digitalWrite(PM25_LED_PIN, HIGH);

  panelTemp.requestTemperatures();
  float pTemp = panelTemp.getTempCByIndex(0);

  float r_norm = 0, g_norm = 0, b_norm = 0;
  uint16_t prox = 0;
  
  if (Lpg.ping()) {
    rgbProportion = Lpg.getRGBProportion();
    r_norm = constrain((float)rgbProportion[0] / 1024.0, 0.0, 1.0);
    g_norm = constrain((float)rgbProportion[1] / 1024.0, 0.0, 1.0);
    b_norm = constrain((float)rgbProportion[2] / 1024.0, 0.0, 1.0);
    prox = Lpg.getProximity();
  }

  float voltage = ina219.getBusVoltage_V();
  float current = ina219.getCurrent_mA();
  float airTemp = bme280.readTemperature();
  float humidity = bme280.readHumidity();
  float lux = lightMeter.readLightLevel();

  // 3. Build AI READY JSON PACKET
  StaticJsonDocument<1024> doc;
  doc["v"]   = voltage;
  doc["ma"]  = current;
  doc["ta"]  = airTemp;
  doc["tp"]  = pTemp;
  doc["hum"] = humidity;
  doc["prox"] = (int)prox;
  doc["r"]   = r_norm; 
  doc["g"]   = g_norm;
  doc["b"]   = b_norm;
  doc["lux"] = lux;
  doc["dst"] = pmValue;
  doc["tlt"] = (int)round(tiltAngle);
  doc["vib"] = delta;

  if (WiFi.status() == WL_CONNECTED) {
    WiFiClient client;
    HTTPClient http;
    http.begin(client, serverUrl);
    http.addHeader("Content-Type", "application/json");

    String requestBody;
    serializeJson(doc, requestBody);
    int httpCode = http.POST(requestBody);

    if (httpCode == 200) {
      String response = http.getString();
      StaticJsonDocument<2048> resDoc;
      deserializeJson(resDoc, response);
      aiCause = resDoc["insight"]["live_diagnosis"]["root_cause"].as<String>();
    } else {
      aiCause = "Server Error";
    }
    http.end();
  } else {
    aiCause = "WiFi Lost";
  }
  display.clearDisplay();
  display.setCursor(0, 0);
  display.println("--- SOLAR LIVE ---");
  display.print("POWER: "); display.print(voltage, 1); display.print("V "); display.print(current, 0); display.println("mA");
  display.print("TEMP : "); display.print(pTemp, 1); display.println(" C");
  display.print("LIGHT: "); display.print((int)lux); display.println(" lx");
  display.println("------------------");
  display.print("AI   : "); display.println(aiCause);
  display.display();

  Serial.print("AI Status: "); Serial.println(aiCause);
  serializeJson(doc, Serial);
  Serial.println("\n");

  delay(60000); 
}