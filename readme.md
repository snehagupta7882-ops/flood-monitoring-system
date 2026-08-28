# 🌊 FloodGuard — Smart Flood Monitoring & Early Warning System

FloodGuard is an IoT-based smart flood monitoring system designed to monitor
water levels and environmental conditions in real time.

The system uses an ESP32 with multiple sensors to collect environmental data.
The data is sent to Blynk Cloud and retrieved through a Flask REST API,
which connects the IoT system with a web-based monitoring dashboard.

---

## 🚨 Problem Statement

Floods can cause severe damage to life, property, agriculture, and
infrastructure. Traditional monitoring systems may not provide continuous
real-time information to users.

FloodGuard aims to provide:

- Real-time water level monitoring
- Environmental condition monitoring
- Flood risk status detection
- Visual monitoring through a web dashboard
- Automatic alerts during critical water levels

---

## 💡 Proposed Solution

FloodGuard combines IoT hardware, cloud connectivity, backend APIs,
and a web dashboard into a single monitoring system.

### System Flow

ESP32 + Sensors
        ↓
Sensor Data Processing
        ↓
Blynk Cloud
        ↓
Flask REST API
        ↓
JavaScript Frontend
        ↓
Web Monitoring Dashboard

---

## 🔧 Hardware Components

- ESP32 Development Board
- DHT22 Temperature & Humidity Sensor
- HC-SR04 Ultrasonic Sensor
- Potentiometer (used to simulate water-level sensor)
- Buzzer
- LED
- 16x2 I2C LCD

---

## 🖥️ Simulation

The hardware system is simulated using **Wokwi**.

The Wokwi simulation allows the project to be tested without requiring
physical hardware.

### Simulated Sensors

| Sensor | Purpose |
|--------|---------|
| DHT22 | Temperature & Humidity |
| HC-SR04 | Distance / Water-Level Measurement |
| Potentiometer | Simulated Water-Level Sensor |
| LED | Flood Warning Indicator |
| Buzzer | Emergency Alert |
| LCD | Local Sensor Display |

---

## ☁️ Blynk Cloud

Blynk Cloud is used for IoT data communication.

The ESP32 sends sensor readings to virtual pins:

| Virtual Pin | Data |
|-------------|------|
| V0 | Water Level (%) |
| V1 | Temperature (°C) |
| V2 | Humidity (%) |
| V3 | Flood Status |
| V4 | Distance (cm) |

Blynk also handles flood alert events when the water level crosses the
danger threshold.

---

## 🌐 Web Dashboard

FloodGuard provides a web-based dashboard for monitoring sensor data.

### Dashboard Features

- 🌊 Live Water Level
- 🌡️ Temperature Monitoring
- 💧 Humidity Monitoring
- 🚨 Flood Status
- 📊 Water Level Trend Chart
- ⚡ System Health
- ☁️ Blynk Cloud Status
- 📋 Alert History
- 🕒 Last Updated Time

The dashboard uses a dark interface with pink as the primary highlight
colour and supporting colours for different system states.

---

## 🧠 Flood Status Logic

The current system uses threshold-based flood classification.

| Water Level | Status |
|-------------|--------|
| 0–40% | NORMAL |
| 41–70% | WARNING |
| Above 70% | DANGER |

When the water level crosses the danger threshold:

- LED turns ON
- Buzzer turns ON
- Blynk flood alert event is triggered

---

## ⚙️ Technology Stack

### Hardware / IoT

- ESP32
- DHT22
- HC-SR04
- Potentiometer
- Buzzer
- LED
- I2C LCD

### Simulation

- Wokwi

### Cloud

- Blynk IoT

### Backend

- Python
- Flask
- REST API
- Requests

### Frontend

- HTML5
- CSS3
- JavaScript
- Chart.js

### Development Tools

- Visual Studio Code
- Git
- GitHub

---

## 📁 Project Structure

```text
FloodGuard/
│
├── frontend/
│   └── index.html
│
├── backend/
│   ├── app.py
│   └── venv/
│
├── esp32/
│   └── flood_monitoring.ino
│
├── wokwi/
│   └── diagram.json
│
└── README.md
