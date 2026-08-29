/**
 * ASTRA-ResQ: Real-Life Disaster Scenario Simulator
 * Simulates active drills, triggers live telemetry shifts, sirens, and automatic AI path rerouting.
 */

class DisasterSimulator {
    constructor() {
        this.activeScenario = null;
    }

    runScenario(scenarioId) {
        this.activeScenario = scenarioId;
        console.log('Running Disaster Drill Scenario:', scenarioId);

        if (scenarioId === 'flood') {
            this.triggerMonsoonFlood();
        } else if (scenarioId === 'fire') {
            this.triggerChemicalFire();
        } else if (scenarioId === 'cyclone') {
            this.triggerCycloneAlert();
        } else if (scenarioId === 'heatwave') {
            this.triggerHeatwaveCrisis();
        }

        if (window.AudioSynth) {
            window.AudioSynth.playSonarPing();
        }
    }

    triggerMonsoonFlood() {
        // 1. Update Telemetry UI
        document.getElementById('telemetry-water-gauge').innerText = '10.4m (CRITICAL)';
        document.getElementById('telemetry-water-gauge').className = 'stat-value text-red-400 font-bold';
        document.getElementById('telemetry-rain-rate').innerText = '82 mm/hr';
        document.getElementById('telemetry-threat-level').innerText = 'CRITICAL (P1)';
        document.getElementById('telemetry-threat-level').className = 'threat-tag bg-red-600 text-white animate-pulse';

        // 2. Block the flooded southern junction
        if (window.PathfindingEngine) {
            window.PathfindingEngine.clearObstacles();
            window.PathfindingEngine.setNodeObstacle('N_SOUTH_JUNC', true);
            window.PathfindingEngine.setNodeObstacle('N_MECH', true);
        }

        // 3. Mark Mech Block and South Drainage on data
        const mech = window.SRU_DATA.buildings.find(b => b.id === 'sru-mech-civil');
        if (mech) {
            mech.status = 'WATERLOGGED';
            mech.waterlogged = true;
        }

        // 4. Add AI Incident
        if (window.AITriageEngine) {
            const inc = window.AITriageEngine.addIncident({
                title: 'CRITICAL INUNDATION: Hasanparthy Catchment Overflow',
                location: 'South Campus & Mech Block Lower Ground',
                type: 'FLOOD',
                waterLevel: 1.4,
                trapped: 4,
                damage: 40,
                details: 'Water surging into south road. Pathfinding engine rerouted all escape corridors to Sports Arena Assembly Point Beta.'
            });
            if (window.renderIncidentQueue) window.renderIncidentQueue();
        }

        // 5. Automatic Voice Announcement
        if (window.VoiceAssistant) {
            window.VoiceAssistant.speak('Emergency Flood Alert: South drainage overflow detected. Mech Block path is blocked. Proceed to Sports Complex Assembly Point Beta immediately.');
        }

        // 6. Recalculate route for Admin Block
        if (window.planEvacuationFrom) {
            window.planEvacuationFrom('sru-hostel-girls', 'N_SAFE_BETA');
        }

        alert('?? DRILL ACTIVATED: Severe Monsoon Flood Inundation! AI has blocked flooded corridors and updated evacuation routes to Sports Arena.');
    }

    triggerChemicalFire() {
        document.getElementById('telemetry-threat-level').innerText = 'HAZARD (P1)';
        document.getElementById('telemetry-threat-level').className = 'threat-tag bg-red-600 text-white animate-pulse';

        if (window.PathfindingEngine) {
            window.PathfindingEngine.clearObstacles();
            window.PathfindingEngine.setNodeObstacle('N_MECH', true);
            window.PathfindingEngine.setNodeObstacle('N_HEALTH', true);
        }

        if (window.AudioSynth) {
            window.AudioSynth.toggleSiren(true);
        }

        if (window.AITriageEngine) {
            window.AITriageEngine.addIncident({
                title: 'HAZMAT & FIRE: Engineering Lab Annex Smoke Alert',
                location: 'Mechanical & Civil Engineering Labs (MCE-03)',
                type: 'FIRE',
                fireSpread: 65,
                trapped: 2,
                damage: 60,
                details: 'Chemical solvent vapor ignition. Fire suppression engaged. Cordon perimeter active.'
            });
            if (window.renderIncidentQueue) window.renderIncidentQueue();
        }

        if (window.VoiceAssistant) {
            window.VoiceAssistant.speak('Fire emergency in Mechanical Block. Evacuate via North walkway towards Assembly Point Alpha on Central Cricket Ground. Avoid lifts and crawl low under smoke.');
        }

        if (window.planEvacuationFrom) {
            window.planEvacuationFrom('sru-cs-ai-block', 'N_SAFE_ALPHA');
        }

        alert('?? DRILL ACTIVATED: Chemical Fire in Mech-Civil Labs! Siren sounding, corridor isolated, routing to Assembly Alpha.');
    }

    triggerCycloneAlert() {
        document.getElementById('telemetry-wind-speed').innerText = '105 km/h';
        document.getElementById('telemetry-wind-speed').className = 'stat-value text-amber-400 font-bold';
        document.getElementById('telemetry-threat-level').innerText = 'CYCLONE WARNING';
        document.getElementById('telemetry-threat-level').className = 'threat-tag bg-amber-600 text-white';

        if (window.SRU_DATA) {
            window.SRU_DATA.buildings.forEach(b => {
                if (b.type === 'residential') {
                    b.status = 'SHELTER_IN_PLACE';
                }
            });
        }

        if (window.VoiceAssistant) {
            window.VoiceAssistant.speak('Severe Cyclonic Storm Varuna approaching Warangal. All students to remain indoors. Generators active on 72-hour fuel reserve.');
        }

        alert('?? DRILL ACTIVATED: Cyclone Gale Storm approaching! Hostels transitioned to Shelter-in-Place mode.');
    }

    triggerHeatwaveCrisis() {
        document.getElementById('telemetry-temp').innerText = '45.8?C';
        document.getElementById('telemetry-temp').className = 'stat-value text-red-400 font-bold';
        document.getElementById('telemetry-threat-level').innerText = 'HEAT RED ALERT';
        document.getElementById('telemetry-threat-level').className = 'threat-tag bg-red-500 text-white';

        if (window.VoiceAssistant) {
            window.VoiceAssistant.speak('Extreme Heatwave Alert: Ambient temperature 45.8 degrees. Hydration centers active across campus. Restrict outdoor movement.');
        }

        alert('?? DRILL ACTIVATED: 46?C Extreme Heatwave! Campus RO hydration depots dispatched.');
    }

    resetSimulator() {
        this.activeScenario = null;
        if (window.AudioSynth) {
            window.AudioSynth.stopSiren();
        }
        if (window.PathfindingEngine) {
            window.PathfindingEngine.clearObstacles();
        }
        if (window.DisasterMap) {
            window.DisasterMap.clearEvacuationRoute();
            window.DisasterMap.flyTo('sru');
        }

        document.getElementById('telemetry-water-gauge').innerText = '8.4m (NORMAL)';
        document.getElementById('telemetry-water-gauge').className = 'stat-value text-emerald-400 font-bold';
        document.getElementById('telemetry-rain-rate').innerText = '14 mm/hr';
        document.getElementById('telemetry-wind-speed').innerText = '18 km/h';
        document.getElementById('telemetry-temp').innerText = '32.4?C';
        document.getElementById('telemetry-threat-level').innerText = 'OPERATIONAL (NORMAL)';
        document.getElementById('telemetry-threat-level').className = 'threat-tag bg-emerald-600 text-white';

        alert('? DRILL RESET: All parameters returned to normal operational baseline.');
    }
}

window.Simulator = new DisasterSimulator();
