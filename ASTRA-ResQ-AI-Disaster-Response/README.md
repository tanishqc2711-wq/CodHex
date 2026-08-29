# ??? ASTRA-ResQ: AI-Powered Disaster Response & Campus Resilience Command Center

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Python: 3.10+](https://img.shields.io/badge/Python-3.10+-brightgreen.svg)](https://www.python.org/)
[![UI: Tactical Glassmorphic](https://img.shields.io/badge/UI-Tactical%20Glassmorphism-sky.svg)]()
[![Focus: SR University](https://img.shields.io/badge/Focus-SR%20University%2C%20Warangal-orange.svg)]()

> **ASTRA-ResQ** (Automated Situational Triage & Resilience Architecture) is a high-grade, real-time AI emergency management and geospatial command center. It integrates multi-tier geospatial intelligence?from **Pan-India hazard tracking** and **Warangal District disaster telemetry** down to an ultra-detailed microgrid for **SR University (Warangal, Telangana, India)**.

---

## ?? Key Features

### 1. ??? Multi-Tier Geospatial Intelligence & Interactive Mapping
- **SR University Campus Microgrid (`18.0683? N, 79.5447? E`)**:
  - Exact building footprints, live occupancies, rooftop helipads, medical triage centers, and high-voltage grid substations.
  - Safe Assembly Zones with pulsing emerald radar nodes (Assembly Point Alpha, Sports Arena Shelter Beta, North Helipad Gamma).
  - Hazard Perimeters: Low-lying Hasanparthy catchment drainage and transformer safety buffers.
- **Warangal District Emergency Command**:
  - MGM Government General Hospital Trauma ICU & Blood Bank reserves, Warangal Police Commissionerate, SDRF/Fire Services Station, Waddepally Lake & Bhadrakali Lake water level gauges.
- **Pan-India Early Warning Layer**:
  - Cyclonic storm tracking (Cyclone 'VARUNA' on Bay of Bengal), Godavari River Basin flood warning flags (Bhadrachalam), North-Central India heatwave alerts, and Himalayan micro-seismic monitors.

### 2. ????? Dynamic AI Evacuation Routing (A* Pathfinding Algorithm)
- Computes obstacle-free, hazard-avoiding safe corridors from any building on campus to the closest uncompromised safe shelter.
- Dynamically responds to blocked corridors, fallen debris, or flooded roads during active emergencies.
- Step-by-step waypoint guidance with distances in meters and estimated walking duration.

### 3. ?? AI Incident Triage & Computer Vision Damage Classifier
- Multi-variable AI threat scorer ($P1$ Critical to $P4$ Advisory) based on structural integrity, flood height, trapped victims, and fire propagation.
- Simulated Deep Neural Vision Classifier that analyzes disaster photographs with bounding boxes (water depth, wall shear fractures, smoke density, survivor thermal signatures).

### 4. ??? Multilingual Voice AI Assistant & Offline SMS Fallback
- Voice synthesis and speech recognition in **English, Telugu (`??????`), and Hindi (`?????`)**.
- Interactive voice CPR, flood survival, and thermal burn first-aid guidance.
- **1-Click SOS Beacon**: Encrypted broadcast transmitting GPS coordinates, battery level, and campus building code.
- **Zero-Internet SMS Packet Generator**: Produces compressed ASCII telemetry packets for transmission over low-bandwidth GSM or amateur Ham-Radio.

### 5. ? 1-Click Real-Life Disaster Drill Simulator
- **Monsoon Flash Flood Drill**: Waddepally gauge spikes to 10.4m, South Drainage overflows, pathfinding engine blocks flooded roads and recalculates route to Sports Arena Beta.
- **Lab Chemical Fire Drill**: Activates oscillating air-raid siren, cordons off the Mech Block, and routes students to Assembly Alpha.
- **Super Cyclone & Heatwave Drills**: Tests hostel shelter-in-place and campus RO hydration distribution.

### 6. ?? Tactical Audio Soundscape (Web Audio API)
- Real-time oscillating emergency air-raid siren, sonar radar sweeps, distress locator beeps, and tactical radio chirps.

---

## ??? SR University (Warangal) Campus Overview
- **Location**: Ananthasagar, Hasanparthy, Warangal, Telangana 506371, India
- **Coordinates**: `18.0683? N, 79.5447? E`
- **Campus Emergency Hotline**: `+91 870 281 8300` / Health Center: `+91 870 281 8399`
- **Regional Support**: MGM Hospital (`0870-2444444`) | Telangana SDRF (`1070 / 112`)

---
## 🚀 Quick Start & Installation

### Prerequisites

* **Python 3.8 or newer** (Python 3.10+ recommended)
* **Git**
* Any modern web browser such as Chrome, Edge, Firefox, or Safari
* No external Python packages are required. The backend uses Python's standard library.

### Clone the Repository

Open **Git Bash**, Command Prompt, or another terminal and run:

```bash
git clone https://github.com/tanishqc2711-wq/CodHex.git
```

Then enter the project folder:

```bash
cd CodHex
```

### Start the Application

Run:

```bash
python server.py
```

If `python` doesn't work on Windows, try:

```bash
py server.py
```

### Open the Application

After the server starts, open your web browser and visit:

**http://127.0.0.1:8000**

The ASTRA-ResQ command center should now open in your browser.

### Windows Quick Launch

Windows users can also try the included:

```text
SmartDisasterPrevention.bat
```

Double-click the file to launch the application.

### Stop the Server

To stop the server, return to the terminal and press:

```text
Ctrl + C
```


### Prerequisites
- Python 3.8+ (No external third-party pip dependencies required; runs entirely on the Python Standard Library).
- Any modern web browser (Chrome, Edge, Firefox, Safari).

### Clone & Launch
```bash
# Clone the repository
git clone https://github.com/your-username/astra-resq-ai-disaster-response.git

# Navigate into the project folder
cd astra-resq-ai-disaster-response

# Start the server (Windows / Mac / Linux)
python server.py
```

Or on Windows, simply double-click `start.bat`.

Open your browser and navigate to:
?? **`http://127.0.0.1:8000`**

---

## ?? Repository Structure
```text
astra-resq-ai-disaster-response/
?
??? server.py                        # Python backend REST API & static server
??? start.bat                        # Windows 1-click launcher
??? run.sh                           # Linux/macOS launcher
??? requirements.txt                 # Zero external pip dependencies
??? README.md                        # Documentation & setup guide
??? LICENSE                          # MIT License
?
??? public/                          # Frontend web assets
    ??? index.html                   # Tactical Command UI layout
    ??? css/
    ?   ??? styles.css               # Dark glassmorphic military-grade stylesheet
    ??? js/
        ??? sru_data.js              # SR University & India disaster geospatial data
        ??? map_engine.js            # Leaflet geospatial mapping & layers
        ??? pathfinding.js           # Dynamic A* safe evacuation routing engine
        ??? ai_triage.js             # AI severity scoring & photo damage analyzer
        ??? voice_assistant.js       # Multilingual voice AI (English, Telugu, Hindi)
        ??? audio_synth.js           # Web Audio API emergency siren & radar pings
        ??? simulator.js             # 1-Click real-life disaster drill simulator
        ??? app.js                   # Master coordinator & live telemetry
```

---

## ?? REST API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/status` | Real-time system telemetry, weather, lake water levels, and operational status. |
| `POST` | `/api/sos` | Ingests encrypted citizen SOS distress beacon and dispatches rescue teams. |

---

## ??? License
This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## ????? Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.
