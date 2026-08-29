/**
 * ASTRA-ResQ: SR University Warangal & Regional Disaster Data Store
 * Location: SR University, Ananthasagar, Hasanparthy, Warangal, Telangana 506371, India
 * Exact Pinpoint: 18.0683° N, 79.5447° E
 */

const SRU_DATA = {
    campus: {
        name: 'SR University (SRU)',
        shortName: 'SR University Warangal',
        tagline: 'Center for Innovation, Research & Disaster Resilience',
        location: 'Ananthasagar, Hasanparthy, Warangal, Telangana 506371',
        center: [18.0683, 79.5447],
        defaultZoom: 17,
        bounds: [
            [18.0620, 79.5380],
            [18.0750, 79.5520]
        ],
        emergencyContacts: {
            campusControl: '+91 870 281 8300',
            healthCenter: '+91 870 281 8399',
            chiefWarden: '+91 94401 23456',
            warangalDisasterHQ: '1077 / 0870-2510100',
            mgmHospital: '0870-2444444',
            telanganaEmergency: '112 / 108'
        }
    },

    // Detailed campus infrastructure nodes
    buildings: [
        {
            id: 'sru-main-admin',
            name: 'Administrative & Central Academic Tower',
            short: 'Admin Block',
            code: 'ADM-01',
            type: 'academic',
            coords: [18.0688, 79.5445],
            floors: 4,
            capacity: 2500,
            currentOccupancy: 840,
            hasRooftopHelipad: true,
            generatorBackup: 'Active (500 kVA Diesel + 200kW Solar)',
            status: 'SAFE',
            waterlogged: false,
            power: 'ONLINE',
            firstAidStation: true,
            facilities: ['Rooftop Helipad', 'Incident War Room', 'High-Gain Satellite Uplink', 'Emergency Power Depot']
        },
        {
            id: 'sru-cs-ai-block',
            name: 'School of AI & Computer Science Engineering',
            short: 'AI & CS Block',
            code: 'CSE-02',
            type: 'academic',
            coords: [18.0694, 79.5452],
            floors: 5,
            capacity: 1800,
            currentOccupancy: 620,
            status: 'SAFE',
            waterlogged: false,
            power: 'ONLINE',
            firstAidStation: true,
            facilities: ['AI Compute Cluster', 'IoT Sensor Hub', 'Drone Telemetry Base Station', 'Server Backup Batteries']
        },
        {
            id: 'sru-mech-civil',
            name: 'Mechanical, Civil & Robotics Engineering Wing',
            short: 'Mech-Civil Labs',
            code: 'MCE-03',
            type: 'laboratory',
            coords: [18.0676, 79.5436],
            floors: 3,
            capacity: 1200,
            currentOccupancy: 310,
            status: 'MONITORED',
            waterlogged: false,
            power: 'ONLINE',
            chemicalHazardRisk: 'Low',
            facilities: ['Heavy Fabrication Lab', 'Hydraulics Testbed', 'Structural Integrity Lab', 'Hazardous Chemical Locker']
        },
        {
            id: 'sru-hostel-boys-a',
            name: 'Boys Residence Hall (Alpha Block)',
            short: 'Boys Hostel A',
            code: 'BHA-04',
            type: 'residential',
            coords: [18.0705, 79.5432],
            floors: 4,
            capacity: 900,
            currentOccupancy: 750,
            status: 'SAFE',
            waterlogged: false,
            power: 'ONLINE',
            foodSupplyDays: 4,
            facilities: ['Rooftop Rainwater Harvesting', 'Dining Hall', 'First Aid Box', 'Emergency Evac Staircases']
        },
        {
            id: 'sru-hostel-boys-b',
            name: 'Boys Residence Hall (Beta Block)',
            short: 'Boys Hostel B',
            code: 'BHB-05',
            type: 'residential',
            coords: [18.0712, 79.5438],
            floors: 4,
            capacity: 850,
            currentOccupancy: 710,
            status: 'SAFE',
            waterlogged: false,
            power: 'ONLINE',
            foodSupplyDays: 4,
            facilities: ['Solar Water Heating', 'Emergency Siren Node', 'Evac Assembly Lawn Access']
        },
        {
            id: 'sru-hostel-girls',
            name: 'Girls Residence Hall & Research Scholars Complex',
            short: 'Girls Hostel Complex',
            code: 'GHC-06',
            type: 'residential',
            coords: [18.0670, 79.5462],
            floors: 4,
            capacity: 1100,
            currentOccupancy: 920,
            status: 'SAFE',
            waterlogged: false,
            power: 'ONLINE',
            foodSupplyDays: 5,
            facilities: ['24/7 Security Gate', 'Medical Sub-Station', 'Independent Diesel Gen', 'High Perimeter Wall']
        },
        {
            id: 'sru-central-library',
            name: 'Central Knowledge Center & Digital Archive',
            short: 'Central Library',
            code: 'LIB-07',
            type: 'academic',
            coords: [18.0681, 79.5458],
            floors: 3,
            capacity: 800,
            currentOccupancy: 240,
            status: 'SAFE',
            waterlogged: false,
            power: 'ONLINE',
            facilities: ['Fire-Resistant Archives', 'Wi-Fi Mesh Repeater', 'Auditory Alert Pods']
        },
        {
            id: 'sru-sports-complex',
            name: 'Indoor Multipurpose Sports Arena & Gymnasium',
            short: 'Indoor Sports Arena',
            code: 'SPT-08',
            type: 'assembly',
            coords: [18.0662, 79.5448],
            floors: 2,
            capacity: 3500,
            currentOccupancy: 95,
            status: 'SAFE_SHELTER',
            shelterReady: true,
            hasCleanWater: true,
            power: 'ONLINE',
            facilities: ['Primary Disaster Relief Shelter', 'Capacity: 3,500 evacuees', 'High Plinth Level (+1.8m elevation)', 'Showers & RO Water Plant']
        },
        {
            id: 'sru-health-center',
            name: 'SRU University Hospital & Emergency Triage',
            short: 'Health & Triage Center',
            code: 'MED-09',
            type: 'medical',
            coords: [18.0686, 79.5435],
            floors: 2,
            capacity: 150,
            beds: 45,
            availableBeds: 38,
            status: 'SAFE_MEDICAL',
            oxygenAvailable: '12 Cylinders (47L)',
            ambulances: 2,
            doctorOnDuty: 'Dr. K. Srinivas (Chief Medical Officer)',
            facilities: ['Trauma Stabilization Room', 'Defibrillators & Oxygen Concentrators', '2x ALS Ambulances', 'Burn Care Stock']
        },
        {
            id: 'sru-auditorium',
            name: 'Grand University Convention Hall & Auditorium',
            short: 'Main Auditorium',
            code: 'AUD-10',
            type: 'assembly',
            coords: [18.0699, 79.5465],
            floors: 2,
            capacity: 2000,
            currentOccupancy: 50,
            status: 'SAFE_SHELTER',
            shelterReady: true,
            hasCleanWater: true,
            power: 'ONLINE',
            facilities: ['Secondary Mass Shelter', 'Acoustic PA Broadcast System', 'Restrooms & Food Distribution']
        },
        {
            id: 'sru-substation',
            name: 'Main 33kV Electrical Substation & Solar Farm',
            short: 'Power Substation',
            code: 'PWR-11',
            type: 'utility',
            coords: [18.0658, 79.5428],
            floors: 1,
            capacity: 20,
            currentOccupancy: 4,
            status: 'HIGH_VOLTAGE_CAUTION',
            power: 'ONLINE',
            facilities: ['Auto-Trip Breakers', 'Solar Inverters', 'Transformer Fire Barriers']
        }
    ],

    // Designated Safe Evacuation Assembly Zones
    safeZones: [
        {
            id: 'safe-zone-1',
            name: 'Assembly Point Alpha (Central Cricket Oval)',
            short: 'Assembly Point Alpha',
            coords: [18.0680, 79.5448],
            radius: 50,
            capacity: 4500,
            elevation: 'High Ground (Zero Inundation Zone)',
            amenities: ['Emergency Shelter Tents', '10,000L Drinking Water', 'Acoustic Siren Beacon', 'Drone Airdrop Landing Grid']
        },
        {
            id: 'safe-zone-2',
            name: 'Assembly Point Beta (Indoor Sports Complex)',
            short: 'Assembly Point Beta (Sports Arena)',
            coords: [18.0662, 79.5448],
            radius: 55,
            capacity: 3500,
            elevation: 'Elevated Reinforced Shelter (+2.1m)',
            amenities: ['Medical First-Aid Post', 'RO Drinking Water', 'Emergency Beds', 'Satellite Wi-Fi']
        },
        {
            id: 'safe-zone-3',
            name: 'Assembly Point Gamma (North Helipad & Lawn)',
            short: 'Helipad & Rapid Evac Point',
            coords: [18.0700, 79.5450],
            radius: 40,
            capacity: 1200,
            elevation: 'Elevated Lawn & Helipad',
            amenities: ['NDRF Air-Evacuation Landing Zone', 'Cargo Drone Port', 'Mobile Command Van']
        }
    ],

    // Hazard Zones prone to flash floods / electrical / chemicals
    hazardZones: [
        {
            id: 'hazard-drainage',
            name: 'South Campus Low-Lying Drainage Channel',
            coords: [18.0650, 79.5435],
            radius: 75,
            type: 'FLOOD_RISK',
            severity: 'MEDIUM',
            description: 'Prone to rapid water accumulation during heavy rainfall (>60mm/hr) from Hasanparthy overflow.'
        },
        {
            id: 'hazard-transformer',
            name: 'High Voltage Transformer Yard',
            coords: [18.0658, 79.5428],
            radius: 35,
            type: 'ELECTRICAL_HAZARD',
            severity: 'HIGH',
            description: 'High voltage equipment. Restrict entry within 30m during water stagnation or storm.'
        }
    ],

    // Campus Navigation Graph Nodes & Edges for A* Pathfinding
    navGraph: {
        nodes: [
            { id: 'N_ADMIN', coords: [18.0688, 79.5445], name: 'Admin Entrance' },
            { id: 'N_CS', coords: [18.0694, 79.5452], name: 'AI/CS Concourse' },
            { id: 'N_MECH', coords: [18.0676, 79.5436], name: 'Mech Block Portico' },
            { id: 'N_HOSTEL_A', coords: [18.0705, 79.5432], name: 'Boys Hostel A Gate' },
            { id: 'N_HOSTEL_B', coords: [18.0712, 79.5438], name: 'Boys Hostel B Gate' },
            { id: 'N_HOSTEL_G', coords: [18.0670, 79.5462], name: 'Girls Hostel Plaza' },
            { id: 'N_LIB', coords: [18.0681, 79.5458], name: 'Library Walkway' },
            { id: 'N_SPORTS', coords: [18.0662, 79.5448], name: 'Sports Complex Gate' },
            { id: 'N_HEALTH', coords: [18.0686, 79.5435], name: 'Health Center Ramp' },
            { id: 'N_AUDITORIUM', coords: [18.0699, 79.5465], name: 'Auditorium Promenade' },
            { id: 'N_CENTRAL_JUNC', coords: [18.0684, 79.5446], name: 'Main Central Crossroad' },
            { id: 'N_NORTH_JUNC', coords: [18.0700, 79.5442], name: 'North Boulevard Junction' },
            { id: 'N_SOUTH_JUNC', coords: [18.0668, 79.5444], name: 'South Avenue Junction' },
            { id: 'N_EAST_PATH', coords: [18.0685, 79.5458], name: 'East Campus Boulevard' },
            { id: 'N_SAFE_ALPHA', coords: [18.0680, 79.5448], name: 'Assembly Alpha Center' },
            { id: 'N_SAFE_BETA', coords: [18.0662, 79.5448], name: 'Assembly Beta Shelter' },
            { id: 'N_SAFE_GAMMA', coords: [18.0700, 79.5450], name: 'Assembly Gamma Helipad' }
        ],
        edges: [
            ['N_ADMIN', 'N_CENTRAL_JUNC'],
            ['N_CS', 'N_EAST_PATH'],
            ['N_CS', 'N_NORTH_JUNC'],
            ['N_MECH', 'N_SOUTH_JUNC'],
            ['N_MECH', 'N_HEALTH'],
            ['N_HEALTH', 'N_CENTRAL_JUNC'],
            ['N_HOSTEL_A', 'N_NORTH_JUNC'],
            ['N_HOSTEL_B', 'N_NORTH_JUNC'],
            ['N_HOSTEL_G', 'N_SOUTH_JUNC'],
            ['N_HOSTEL_G', 'N_EAST_PATH'],
            ['N_LIB', 'N_EAST_PATH'],
            ['N_LIB', 'N_CENTRAL_JUNC'],
            ['N_SPORTS', 'N_SOUTH_JUNC'],
            ['N_SPORTS', 'N_SAFE_BETA'],
            ['N_AUDITORIUM', 'N_EAST_PATH'],
            ['N_AUDITORIUM', 'N_SAFE_GAMMA'],
            ['N_CENTRAL_JUNC', 'N_NORTH_JUNC'],
            ['N_CENTRAL_JUNC', 'N_SOUTH_JUNC'],
            ['N_CENTRAL_JUNC', 'N_EAST_PATH'],
            ['N_CENTRAL_JUNC', 'N_SAFE_ALPHA'],
            ['N_NORTH_JUNC', 'N_SAFE_GAMMA'],
            ['N_SOUTH_JUNC', 'N_SAFE_BETA'],
            ['N_EAST_PATH', 'N_SAFE_ALPHA']
        ]
    },

    // Warangal District Emergency Hubs
    regionalHubs: [
        {
            id: 'mgm-hospital-wgl',
            name: 'MGM Government General Hospital Warangal',
            type: 'Super Specialty Trauma Hospital',
            coords: [17.9984, 79.5936],
            beds: 1200,
            icuBeds: 180,
            phone: '+91 870 244 4444',
            distanceFromSRU: '12.4 km South',
            status: 'ACTIVE_24x7',
            capabilities: ['Trauma ICU', 'Blood Bank', 'Burn Care', 'Casualty Triage']
        },
        {
            id: 'wgl-police-commissionerate',
            name: 'Warangal Police Commissionerate Emergency HQ',
            type: 'Police & Disaster War Room',
            coords: [17.9782, 79.6012],
            phone: '100 / 0870-2444100',
            distanceFromSRU: '14.1 km South',
            status: 'READY',
            capabilities: ['VHF Radio Relay', 'Traffic Escort', 'Disaster Control']
        },
        {
            id: 'ndrf-sdrf-wgl',
            name: 'SDRF & Telangana Fire Services Command Station',
            type: 'Disaster Quick Response Station',
            coords: [18.0125, 79.5750],
            vehicles: ['4 Flood Rescue Boats', '8 Fire Tenders', '2 Heavy Pumps', '140 Personnel'],
            phone: '101 / 1077',
            distanceFromSRU: '9.2 km South',
            status: 'ALERT_LEVEL_1'
        },
        {
            id: 'waddepally-lake-gauge',
            name: 'Waddepally Lake Flood Inflow Telemetry Station',
            type: 'Hydrological Telemetry Sensor',
            coords: [18.0245, 79.5520],
            waterLevelMeters: 8.4,
            dangerLevelMeters: 10.2,
            trend: 'Rising (+0.14m/hr)',
            status: 'NORMAL_TO_WATCH'
        },
        {
            id: 'bhadrakali-lake-gauge',
            name: 'Bhadrakali Lake Bund & Spillway Sensor',
            type: 'Hydrological Telemetry Sensor',
            coords: [17.9890, 79.5850],
            waterLevelMeters: 6.8,
            dangerLevelMeters: 8.5,
            trend: 'Stable',
            status: 'NORMAL'
        },
        {
            id: 'hasanparthy-sub-center',
            name: 'Hasanparthy Community Health Center (PHC)',
            type: 'Community Health Center',
            coords: [18.0820, 79.5310],
            beds: 30,
            phone: '+91 870 281 2200',
            distanceFromSRU: '2.8 km North-West',
            status: 'ACTIVE'
        }
    ],

    // India-Level National Hazard Map Feed
    nationalHazards: [
        {
            id: 'cyclone-bay-of-bengal',
            name: 'Cyclonic Storm VARUNA (Bay of Bengal)',
            coords: [15.8, 83.2],
            category: 'Severe Cyclonic Storm',
            windSpeed: '105 km/h',
            movement: 'North-West @ 16 km/h towards AP/Telangana Coastal Plains',
            impactZoneRadius: 280000,
            alertLevel: 'ORANGE',
            imdsAlert: 'ORANGE WARNING: Heavy to very heavy rainfall expected across Telangana & Coastal Andhra Pradesh.'
        },
        {
            id: 'godavari-basin-flood',
            name: 'Godavari River Basin Inundation (Bhadradri-Kothagudem)',
            coords: [17.6688, 80.8876],
            category: 'Riverine Flood Stage 2',
            dischargeCusecs: '1,250,000 cusecs',
            alertLevel: 'RED',
            imdsAlert: 'Water level at Bhadrachalam reached 48.6 ft (2nd warning flag). Inflow surging.'
        },
        {
            id: 'delhi-ncr-heatwave',
            name: 'North-Central India Severe Heatwave Alert',
            coords: [28.6139, 77.2090],
            category: 'Severe Heatwave',
            tempCelsius: 45.8,
            alertLevel: 'RED',
            imdsAlert: 'Severe Loo winds with peak heat index exceeding 48°C. Hospital heat wards activated.'
        },
        {
            id: 'himalayan-seismic-zone',
            name: 'Western Himalayan Micro-Seismic Activity',
            coords: [31.1048, 77.1734],
            category: 'Seismic Zone IV/V',
            magnitude: 'M 4.2',
            depth: '12 km',
            alertLevel: 'YELLOW',
            imdsAlert: 'Micro tremors recorded along Main Boundary Thrust. Landslide watch active.'
        },
        {
            id: 'mumbai-urban-flood',
            name: 'Konkan Coast High Tide & Inundation Watch',
            coords: [19.0760, 72.8777],
            category: 'High Tide & Rain',
            tideHeightMeters: 4.85,
            alertLevel: 'ORANGE',
            imdsAlert: 'Mithi river flood gates on standby. Low-lying coastal areas alerted.'
        }
    ],

    // Emergency resources on SRU Campus & Warangal
    resources: {
        campus: {
            rescueDrones: { total: 4, active: 2, batteryAvg: '92%' },
            ambulances: { total: 2, available: 2 },
            emergencyGenerators: { total: 5, operational: 5, fuelHours: 72 },
            cleanWaterLiters: 85000,
            foodRationMeals: 14000,
            medicalKits: 120,
            oxygenCylinders: 16,
            lifeJackets: 250,
            inflatableRafts: 3,
            satelliteRadios: 6,
            trainedVolunteers: 64
        },
        warangalDistrict: {
            ndrfPersonnel: 140,
            rescueBoats: 18,
            fireTenders: 12,
            hospitalBeds: 2400,
            icuBeds: 320,
            bloodUnitsAvailable: {
                'O+': 84, 'A+': 62, 'B+': 91, 'AB+': 28,
                'O-': 14, 'A-': 12, 'B-': 15, 'AB-': 8
            }
        }
    }
};

if (typeof window !== 'undefined') {
    window.SRU_DATA = SRU_DATA;
}
