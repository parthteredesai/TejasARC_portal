# TejasArk 

*Published Date* : 31 Dec 2025

## *Title: TejasArk - Sensor Based AI Powered Solar Panel Monitoring System*

## TejasArk 

**TejasArk Portal** is a web application developed for an **IEEE Myosa Sensors Competition**. It serves main portal for the TejasArk Solar Monitoring System, providing dynamic views, user interaction, and content delivery using Node.js, Express, and EJS templating.

Excerpt:
Undetected faults and environmental effects significantly reduce solar efficiency. TejasArk delivers Sensor based AI supported solution for real-time PV monitoring, fault detection, and predictive maintenance.

<p align="center">
<img src="./images/tejasark_coverpage.png" alt="Folder Architecture" width="600" hight="600"><br/>
<i>TejasArk Cover Page</i>
</p>

## tags:
  - solar-energy
  - iot-monitoring
  - photovoltaic
  - sensor-data
  - predictive-maintenance

*Improving solar panel reliability through continuous sensor-based monitoring and smart diagnostics.*

## Acknowledgements

We, Team TejasArk would like to express our sincere gratitude to the **IEEE Sensors Council** and the **MYOSA 4.0** team for providing the platform and resources to develop this project. The MYOSA Mini Kit and open-source environment were instrumental in the prototyping of TejasArk. 

We are also thankful to our mentor, [Ms. Valentina Basker](https://ieeexplore.ieee.org/author/37088858636) as well as our college [St. Francis Institute Of Technology](https://www.sfit.ac.in/) for their invaluable guidance and support.

## Overview

Solar PV systems often suffer from unnoticed performance degradation caused by dust buildup, environmental stress, and hidden technical faults, leading to reduced energy output and higher maintenance costs. This project addresses the problem through a sensor-driven IoT framework that continuously monitors temperature, voltage, current, irradiance, and several other environmental parameters to detect faults and efficiency loss in real time. AI-based analytics are applied as a secondary layer to predict decline in performance and recommend timely maintenance, resulting in a low-cost, self-diagnostic solution that improves reliability and minimizes downtime.

## Demo / Examples
## Parameters detected by TejasArk System
  - Voltage
  - Current
  - Power
  - Tilt axis
  - Vibration
  - Motion
  - R G B Values
  - Proximity
  - Light Irradiation
  - Altitude
  - Pressure
  - Panel Temperature
  - Ambient Temperature
  - Dust particulate matter

### Images
<p align="center">
<img src="./images/mainpage.png" alt="Folder Architecture" width="600" hight="600"><br/>
<i>TejasArk Main Page</i>
</p>

<p align="center">
<img src="./images/dashbaord1.png" alt="Folder Architecture" width="600" hight="600"><br/>
<img src="./images/dashboard2.png" alt="Folder Architecture" width="600" hight="600"><br/>
<img src="./images/responsive.png" alt="Folder Architecture" width="600" hight="600"><br/>  
<i>TejasArk Dashboard</i>
</p>

<p align="center">
  <img src="./images/panel_front.png" width="400" height="400" /><br/>
  <i>TejasArk Front Panel</i>
</p>

<p align="center">
  <img src="./images/hardware_cir.png" width="400" height="400" /><br/>
  <i>TejasArk Circuit</i>
</p>

<p align="center">
  <img src="./images/cir_sideview.png" width="400" height="400" /><br/>
  <i>TejasArk Side view</i>
</p>

<p align="center">
  <img src="./images/front_sensor.png" width="400" height="400" /><br/>
  <i>TejasArk On Panel Sensor</i>
</p>

<video controls width="80%">
  <source src="images/tejasark_presentation.mp4" type="video/mp4">
</video>

<video controls width="80%">
  <source src="images/tejasark_demo.mp4" type="video/mp4">
</video>

[▶ Download & Watch Video of TejasArk Presentation](images/tejasark_presentation.mp4)

[▶ Download & Watch Video of TejasArk Demonstration](images/tejasark_demo.mp4)

*Due to file upload limitations we were unable to upload high quality videos, hence the video quality is low*

*Click on the link above, then click on view raw & download will start on your device*
## 📌 Features

-  Dynamic content rendering using **EJS templates**
-  Structured routing via **Express.js**
-  Static assets served from `public/` (CSS, images)
-  MVC-like organization (`models`, `views`, etc.)
-  Easy setup for development and deployment

## Usage Instructions

1. Connect the voltage, current, temperature, irradiance, and environmental sensors to the MYOSA board / ESP module and mount them on the solar panel setup.

2. Power on the system to initiate real-time data acquisition. Sensor readings are continuously captured and transmitted to the backend server.

3. Access the web dashboard through a browser to view live sensor values, historical performance graphs, and system status indicators. View at http://localhost:8080/. 

4. Monitor alerts and visual indicators that highlight abnormal conditions such as dust accumulation, shading, overheating, or performance degradation.

5. Use the AI-assisted insights to review predicted efficiency loss and follow the recommended maintenance actions to improve system reliability.


## Tech Stack

<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" width="50" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" width="50" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" width="50" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" width="50" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" width="50" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" width="50" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" width="50" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" width="50" />
  <img src="https://img.shields.io/badge/Express.js-Backend%20Framework-lightgrey?style=for-the-badge" />
  <img src="https://img.shields.io/badge/EJS-Template%20Engine-white?style=for-the-badge&logo=javascript&logoColor=black" />
</p>

<p align="center">
  <strong>
    HTML • CSS • JavaScript • Bootstrap • Node.js • Express.js • MongoDB • EJS • Python • C++
  </strong>
</p>


## 📌 Technologies

- # Frontend

HTML5 – Structure and semantic layout

CSS3 – Responsive UI, dashboard styling, animations

JavaScript (ES6) – Client-side logic, charts, and API handling

EJS (Embedded JavaScript) – Server-side templating for dynamic views

- # Backend

Node.js – Runtime environment for backend services

Express.js – RESTful API development and routing

- # Database

MongoDB Atlas – Cloud-based NoSQL database for storing sensor and AI data

Mongoose – ODM for schema modeling and database interaction

- # IoT & Data Source

MYOSA Motherboard – Real-time sensor data acquisition

Solar Panel Sensors – Voltage, current, power monitoring

- # APIs & Integrations

REST APIs – Data exchange between IoT devices and web dashboard

OpenWeather API – Weather-based contextual insights (optional module)

- # Visualization

Chart.js – Real-time data visualization (graphs & trends)

- # Development & Deployment

Git & GitHub – Version control and collaboration

VS Code – Development environment

Arduino IDE - Embedded coding in C++

Render – Deployment (as applicable)

- # AI / Analytics

Python: Data preprocessing and AI logic

Flask: Micro-web framework

Tensorflow/Keras: Used to built and train deep neural network model

Scikit learn: Data Processing Operations

Numpy & Pandas: Deriving Mathematical relations in AI logic

Machine Learning Models: Solar performance insights and predictions

## Requirements / Installation
1. **Clone the repo**

   ```bash
   git clone https://github.com/parthteredesai/TejasArk_portal.git
2. **Navigate to project folder**
   cd TejasArk_portal
   

3.**Install dependencies**

<ul>
  
  *All required dependencies are in package.json.
  In your project terminal inside /TejasArk_portal perform **npm install**. It will automatically download all required   depencies in your system.*
  
  steps:
  <li>1️⃣ Prerequisites : You must have Node.js installed (which includes npm) </li>
  <li>2️⃣ Clone the repository :
    ```bash
    
    git clone https://github.com/parthteredesai/TejasArk_portal.git
    cd TejasArk_portal
  </li>
  <li>3️⃣ Install dependencies :
   ```bash
    
    npm install
  </li>
  <li>4️⃣ Start the application :
    ```bash

    npm start
   or
    ```bash

    node app.js 

   The application should now be running at http://localhost:8080/. 
  </li>
</ul>

<ul>
   *Steps to setup AI model server*
  
  steps:
  <li>1️⃣ Install all these required libraries :
    ```bash
    
    pip install tensorflow flask scikit-learn pandas numpy pymongo python-dotenv requests joblib
    
  </li>
  <li>2️⃣ Create the environment:
    ```bash
    
    python -m venv venv
  </li>
  <li>3️⃣ Install the requirements:
   ```bash
    
    pip install -r requirements.txt
  </li>
  <li>4️⃣ Verification:
    ```bash
    
    import tensorflow as tf
    import sklearn
    import flask
    import pymongo

    print(f"TensorFlow: {tf.__version__}")
    print(f"Scikit-Learn: {sklearn.__version__}")
    print("All libraries loaded successfully.")

    
  </li>
</ul>

## 📌 Important

- make your own .env file for weather.api & Mongodb URL
  
## Folder Architecture
<img src="./images/folders.png" alt="Folder Architecture" width="600" hight="600">

# 🤝 Contributing
## Contributions are welcome! Please follow these steps:
- Fork the Project.
- Create your Feature Branch (git checkout -b feature/Feature).
- Commit your Changes (git commit -m 'Add some Feature').
- Push to the Branch (git push origin feature/AmazingFeature).
- Open a Pull Request.

📄 License
None

📧 Contact
Team TejasArk

Email: ds62442.phnx@student.sfit.ac.in,  parth.teredesai@student.sfit.ac.in,  arhaanshaikh020@student.sfit.ac.in
