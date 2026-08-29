/**
 * ASTRA-ResQ: AI Incident Triage, Damage Assessment & Resource Optimizer
 */

class AITriageEngine {
    constructor() {
        this.incidents = [
            {
                id: 'INC-701',
                title: 'Monsoon Waterlogging Near South Drainage Stream',
                location: 'SRU South Perimeter (Drainage Channel)',
                coords: [18.0650, 79.5435],
                type: 'FLOOD',
                severityScore: 78,
                priority: 'P2',
                timestamp: '5 mins ago',
                reportedBy: 'IoT Water Depth Gauge #04',
                status: 'RESPONDING',
                details: 'Water depth reached 0.85m in low culvert. Road to south sports gate partially submerged.',
                dispatchAssigned: ['Drone Alpha-1 (Thermal/Depth)', 'De-watering Pump Team #2'],
                casualties: { injured: 0, trapped: 0, evacuated: 35 }
            },
            {
                id: 'INC-702',
                title: 'High Tension Line Sparking & Wind Warning',
                location: 'Power Substation Area (PWR-11)',
                coords: [18.0658, 79.5428],
                type: 'ELECTRICAL',
                severityScore: 92,
                priority: 'P1',
                timestamp: '12 mins ago',
                reportedBy: 'Substation SCADA Sensor',
                status: 'DISPATCHED',
                details: 'Tree branch touching 33kV incoming feeder. Auto-trip breakers isolated Sector 3.',
                dispatchAssigned: ['Campus Electric Safety Crew', 'Fire Tender #1 on standby'],
                casualties: { injured: 0, trapped: 0, evacuated: 12 }
            },
            {
                id: 'INC-703',
                title: 'Hostel Resident Asthma & Medical Distress',
                location: 'Boys Hostel Alpha (BHA-04, 3rd Floor)',
                coords: [18.0705, 79.5432],
                type: 'MEDICAL',
                severityScore: 84,
                priority: 'P1',
                timestamp: '18 mins ago',
                reportedBy: 'Student SOS App (Room 312)',
                status: 'RESOLVED',
                details: 'Acute bronchospasm triggered by humidity. Nebulization administered by SRU Health EMT.',
                dispatchAssigned: ['Ambulance #1', 'Dr. Srinivas EMT Unit'],
                casualties: { injured: 1, trapped: 0, evacuated: 0 }
            }
        ];
    }

    calculateSeverity(hazardType, trappedPeople, structuralDamage, waterLevelMeters, fireSpreadPercent) {
        let score = 20;

        if (hazardType === 'FIRE') score += 40;
        else if (hazardType === 'FLOOD') score += 30;
        else if (hazardType === 'CYCLONE') score += 35;
        else if (hazardType === 'HEATWAVE') score += 20;

        score += Math.min(30, (trappedPeople || 0) * 8);
        score += Math.min(25, (structuralDamage || 0) * 0.25);
        score += Math.min(20, (waterLevelMeters || 0) * 10);
        score += Math.min(25, (fireSpreadPercent || 0) * 0.3);

        score = Math.min(100, Math.max(10, Math.round(score)));

        let priority = 'P4';
        if (score >= 85) priority = 'P1';
        else if (score >= 65) priority = 'P2';
        else if (score >= 45) priority = 'P3';

        return { score, priority };
    }

    recommendResources(incident) {
        const resources = [];
        if (incident.priority === 'P1') {
            resources.push('1x Advanced Life Support Ambulance', '1x NDRF Tactical Search Squad', '1x Thermal Recon Drone');
        } else if (incident.priority === 'P2') {
            resources.push('1x Rapid Response Van', '1x Inflatable Flood Raft', '2x SRU Emergency Marshals');
        } else {
            resources.push('1x Community Relief Team', '1x Emergency Supply Crate (Water/FirstAid)');
        }
        return resources;
    }

    addIncident(data) {
        const sev = this.calculateSeverity(
            data.type,
            data.trapped || 0,
            data.damage || 0,
            data.waterLevel || 0,
            data.fireSpread || 0
        );

        const newInc = {
            id: 'INC-' + (700 + this.incidents.length + 1),
            title: data.title || 'Reported Campus Emergency',
            location: data.location || 'SRU Campus Node',
            coords: data.coords || [18.0683, 79.5447],
            type: data.type || 'GENERAL',
            severityScore: sev.score,
            priority: sev.priority,
            timestamp: 'Just now',
            reportedBy: data.reportedBy || 'Citizen SOS Mobile App',
            status: 'NEW_ACTIVE',
            details: data.details || 'Disaster incident reported via SOS beacon.',
            dispatchAssigned: [],
            casualties: {
                injured: data.injured || 0,
                trapped: data.trapped || 0,
                evacuated: 0
            }
        };

        newInc.dispatchAssigned = this.recommendResources(newInc);
        this.incidents.unshift(newInc);
        return newInc;
    }

    // Simulated Computer Vision Photo Analyzer
    simulateDamageAnalysis(imageFileName = 'sample_photo.jpg') {
        const presets = [
            {
                name: 'Flood Water Inundation & Structural Risk',
                hazardType: 'FLOOD',
                waterDepth: '1.25 meters',
                damageLevel: 'Moderate (Waterlogged Ground Floor)',
                structuralIntegrity: '78% (Safe for upper floor refuge)',
                victimsDetected: 2,
                urgency: 'HIGH (Priority P2)',
                confidence: '94.6%',
                detections: [
                    { label: 'Water Submersion (1.25m)', box: [20, 60, 90, 35], color: '#38bdf8' },
                    { label: 'Trapped Civilians (2)', box: [35, 25, 30, 25], color: '#ef4444' },
                    { label: 'Submerged Power Cable', box: [65, 75, 25, 20], color: '#f59e0b' }
                ],
                recommendedAction: 'Dispatch Inflatable Boat + Drone Life-Jacket Airdrop to South Terrace.'
            },
            {
                name: 'Fire & Chemical Smoke Plume Detected',
                hazardType: 'FIRE',
                smokeDensity: 'High (Dense Black Smoke)',
                damageLevel: 'Severe Thermal Damage in Lab Annex',
                structuralIntegrity: '55% (Compromised)',
                victimsDetected: 1,
                urgency: 'CRITICAL (Priority P1)',
                confidence: '97.2%',
                detections: [
                    { label: 'Open Flame / Thermal Core', box: [40, 30, 45, 40], color: '#ef4444' },
                    { label: 'Chemical Smoke Cloud', box: [15, 10, 70, 30], color: '#a855f7' },
                    { label: 'Structural Wall Fracture', box: [60, 40, 25, 35], color: '#f97316' }
                ],
                recommendedAction: 'Immediate Fire Tender Dispatch + Cordon off 100m perimeter around Mech Lab.'
            },
            {
                name: 'Structural Fracture & Fallen Debris',
                hazardType: 'SEISMIC_STRUCTURAL',
                damageLevel: 'High Wall Cracking & Blocked Exit',
                structuralIntegrity: '42% (Unsafe)',
                victimsDetected: 3,
                urgency: 'CRITICAL (Priority P1)',
                confidence: '91.8%',
                detections: [
                    { label: 'Major Shear Crack (0.4m)', box: [25, 20, 45, 50], color: '#ef4444' },
                    { label: 'Blocked Corridor Debris', box: [50, 65, 40, 30], color: '#f59e0b' },
                    { label: 'Survivor Heat Signature', box: [30, 35, 20, 25], color: '#10b981' }
                ],
                recommendedAction: 'NDRF Search & Rescue team with hydraulic spreaders required.'
            }
        ];

        const selected = presets[Math.floor(Math.random() * presets.length)];
        return selected;
    }
}

window.AITriageEngine = new AITriageEngine();
