/**
 * ASTRA-ResQ: Main Application Coordinator
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Map
    if (window.DisasterMap) {
        window.DisasterMap.init('map');
    }

    // 2. Start Tactical IST Clock
    updateLiveClock();
    setInterval(updateLiveClock, 1000);

    // 3. Render Incident Queue
    renderIncidentQueue();

    // 4. Render Logistics Data
    renderLogistics();

    // 5. Initialize Telemetry Chart
    initTelemetryChart();

    console.log('ASTRA-ResQ Application Fully Loaded & Operational!');
});

// Digital Tactical Clock
function updateLiveClock() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-IN', { hour12: false });
    const dateStr = now.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    const clockEl = document.getElementById('tactical-clock');
    if (clockEl) {
        clockEl.innerText = `${dateStr} | ${timeStr} IST`;
    }
}

// Navigation Tabs
function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('.nav-tab-btn').forEach(el => el.classList.remove('active-tab'));

    const targetContent = document.getElementById(`tab-content-${tabId}`);
    const targetBtn = document.getElementById(`btn-tab-${tabId}`);

    if (targetContent) targetContent.classList.remove('hidden');
    if (targetBtn) targetBtn.classList.add('active-tab');

    // Invalidate map size if switching back to warroom
    if (tabId === 'warroom' && window.DisasterMap && window.DisasterMap.map) {
        setTimeout(() => {
            window.DisasterMap.map.invalidateSize();
        }, 100);
    }
}

// Plan evacuation route from a given building
window.planEvacuationFrom = function(buildingId, targetSafeZone = null) {
    if (!window.SRU_DATA || !window.PathfindingEngine) return;

    const building = window.SRU_DATA.buildings.find(b => b.id === buildingId);
    if (!building) return;

    // Find closest node to building
    const nearestNode = window.PathfindingEngine.findNearestNode(building.coords[0], building.coords[1]);
    if (!nearestNode) return;

    const result = window.PathfindingEngine.findSafeRoute(nearestNode.id, targetSafeZone);
    if (result) {
        window.DisasterMap.drawEvacuationRoute(result);
        if (window.AudioSynth) window.AudioSynth.playRadioChirp();

        // Update HUD banner
        const evacPanel = document.getElementById('evac-instruction-panel');
        if (evacPanel) {
            evacPanel.classList.remove('hidden');
            document.getElementById('evac-start-name').innerText = building.name;
            document.getElementById('evac-dest-name').innerText = result.destination;
            document.getElementById('evac-distance').innerText = `${result.distance} meters (${result.estimatedTimeMin} min walk)`;
            
            const stepsList = document.getElementById('evac-steps-list');
            if (stepsList) {
                stepsList.innerHTML = result.names.map((name, i) => `<li><span class="step-num">${i + 1}</span> ${name}</li>`).join('');
            }
        }

        // Voice instruction
        if (window.VoiceAssistant) {
            window.VoiceAssistant.speak(`Safe route calculated from ${building.short} to ${result.destination}. Distance: ${result.distance} meters. Proceed along highlighted green path.`);
        }
    } else {
        alert('?? Warning: All direct exit routes to safe zones are obstructed. Shelter in place on upper floor until rescue team arrives!');
    }
};

// Render AI Incidents
function renderIncidentQueue() {
    const listEl = document.getElementById('incident-list');
    if (!listEl || !window.AITriageEngine) return;

    const items = window.AITriageEngine.incidents;
    listEl.innerHTML = items.map(inc => `
        <div class="incident-card priority-${inc.priority.toLowerCase()}">
            <div class="inc-header">
                <span class="inc-p-badge ${inc.priority === 'P1' ? 'badge-p1' : 'badge-p2'}">${inc.priority}</span>
                <span class="inc-score">AI Score: <b>${inc.severityScore}/100</b></span>
                <span class="inc-time">${inc.timestamp}</span>
            </div>
            <h4 class="inc-title">${inc.title}</h4>
            <p class="inc-loc">?? ${inc.location}</p>
            <p class="inc-details">${inc.details}</p>
            <div class="inc-dispatch">
                <label>Dispatched Units:</label>
                <div class="dispatch-tags">
                    ${inc.dispatchAssigned.map(d => `<span class="tag-unit">? ${d}</span>`).join('')}
                </div>
            </div>
        </div>
    `).join('');
}
window.renderIncidentQueue = renderIncidentQueue;

// Render Logistics
function renderLogistics() {
    if (!window.SRU_DATA) return;
    const res = window.SRU_DATA.resources;

    // Campus Stock
    const cEl = document.getElementById('campus-resources-grid');
    if (cEl) {
        cEl.innerHTML = `
            <div class="res-card"><label>Clean Water</label><h3>${res.campus.cleanWaterLiters.toLocaleString()} L</h3><span class="res-sub">12 Tanks Connected</span></div>
            <div class="res-card"><label>Food Meals</label><h3>${res.campus.foodRationMeals.toLocaleString()} Rations</h3><span class="res-sub">5 Days Reserve</span></div>
            <div class="res-card"><label>Oxygen Cylinders</label><h3>${res.campus.oxygenCylinders} Tanks</h3><span class="res-sub">Health Center Triage</span></div>
            <div class="res-card"><label>Rescue Drones</label><h3>${res.campus.rescueDrones.active} / ${res.campus.rescueDrones.total} Active</h3><span class="res-sub">Avg Batt: ${res.campus.rescueDrones.batteryAvg}</span></div>
            <div class="res-card"><label>Life Jackets / Rafts</label><h3>${res.campus.lifeJackets} / ${res.campus.inflatableRafts} Boats</h3><span class="res-sub">Flood Ready</span></div>
            <div class="res-card"><label>Trained Volunteers</label><h3>${res.campus.trainedVolunteers} Active</h3><span class="res-sub">SRU Disaster Corps</span></div>
        `;
    }

    // Warangal Blood Bank Ledger
    const bbEl = document.getElementById('blood-bank-grid');
    if (bbEl) {
        const blood = res.warangalDistrict.bloodUnitsAvailable;
        bbEl.innerHTML = Object.keys(blood).map(type => `
            <div class="blood-card ${blood[type] < 15 ? 'blood-low' : ''}">
                <span class="blood-type">${type}</span>
                <span class="blood-units">${blood[type]} Units</span>
            </div>
        `).join('');
    }
}

// 1-Click Instant SOS Trigger
function triggerSOSBeacon() {
    if (window.AudioSynth) {
        window.AudioSynth.playDistressBeep();
    }

    const modal = document.getElementById('sos-modal');
    if (modal) modal.classList.remove('hidden');

    // Generate simulated low-bandwidth packet
    const coords = '18.0688, 79.5445';
    const packet = `ASTRA-RESQ|SRU-CAMPUS|SOS-EMERGENCY|GPS:${coords}|BAT:89%|TIME:${Date.now()}`;
    const smsEl = document.getElementById('offline-sms-output');
    if (smsEl) smsEl.innerText = packet;

    // Add to AI Incidents
    if (window.AITriageEngine) {
        window.AITriageEngine.addIncident({
            title: 'CITIZEN DISTRESS BEACON: Urgent SOS Broadcast',
            location: 'SR University Main Campus (GPS: 18.0688, 79.5445)',
            type: 'MEDICAL',
            trapped: 1,
            details: 'Emergency SOS beacon triggered from citizen portal. Paramedic drone and campus marshal dispatched.'
        });
        renderIncidentQueue();
    }

    if (window.VoiceAssistant) {
        window.VoiceAssistant.speak('Emergency distress beacon broadcasted to SRU Command War Room and 108 Dispatch. Help is on the way. Stay calm.');
    }
}

function closeSOSModal() {
    const modal = document.getElementById('sos-modal');
    if (modal) modal.classList.add('hidden');
}

// Low Bandwidth SMS Transmitter
function sendOfflineSMS() {
    const packet = document.getElementById('offline-sms-output').innerText;
    alert(`?? Emergency SMS Packet Prepared:

${packet}

Transmitted via Zero-Internet GSM / Ham-Radio Beacon!`);
}

// Multilingual Voice Guidance trigger
function askVoiceGuidance(topic) {
    if (!window.VoiceAssistant) return;
    const guidance = window.VoiceAssistant.getEmergencyGuidance(topic);
    if (!guidance) return;

    // Display in First Aid Drawer
    const guideEl = document.getElementById('first-aid-drawer');
    if (guideEl) {
        guideEl.classList.remove('hidden');
        document.getElementById('first-aid-title').innerText = guidance.title;
        const stepsEl = document.getElementById('first-aid-steps');
        if (stepsEl) {
            stepsEl.innerHTML = guidance.steps.map((s, i) => `<li><b>Step ${i + 1}:</b> ${s}</li>`).join('');
        }
    }

    window.VoiceAssistant.speak(guidance.audio);
}

// AI Photo Damage Scanner Simulation
function runDamageScanner() {
    if (!window.AITriageEngine) return;
    const result = window.AITriageEngine.simulateDamageAnalysis();

    const scanResultEl = document.getElementById('scan-result-card');
    if (scanResultEl) {
        scanResultEl.classList.remove('hidden');
        document.getElementById('scan-title').innerText = result.name;
        document.getElementById('scan-confidence').innerText = `Confidence: ${result.confidence}`;
        document.getElementById('scan-urgency').innerText = result.urgency;
        document.getElementById('scan-action').innerText = result.recommendedAction;

        const detectionsEl = document.getElementById('scan-detections-list');
        if (detectionsEl) {
            detectionsEl.innerHTML = result.detections.map(d => `
                <div class="detection-tag" style="border-left: 4px solid ${d.color};">
                    <span>${d.label}</span>
                </div>
            `).join('');
        }
    }

    if (window.AudioSynth) window.AudioSynth.playSonarPing();
}

// Telemetry Chart (Chart.js)
function initTelemetryChart() {
    const ctx = document.getElementById('telemetryChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
            datasets: [
                {
                    label: 'Waddepally Lake Level (m)',
                    data: [7.8, 7.9, 8.1, 8.2, 8.3, 8.4],
                    borderColor: '#38bdf8',
                    backgroundColor: 'rgba(56, 189, 248, 0.1)',
                    tension: 0.3,
                    fill: true
                },
                {
                    label: 'Rainfall Inflow (mm/h)',
                    data: [8, 12, 22, 35, 28, 14],
                    borderColor: '#10b981',
                    backgroundColor: 'transparent',
                    borderDash: [5, 5],
                    tension: 0.3
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: { color: '#94a3b8', font: { family: 'Plus Jakarta Sans' } }
                }
            },
            scales: {
                x: { ticks: { color: '#64748b' }, grid: { color: 'rgba(255,255,255,0.05)' } },
                y: { ticks: { color: '#64748b' }, grid: { color: 'rgba(255,255,255,0.05)' } }
            }
        }
    });
}
