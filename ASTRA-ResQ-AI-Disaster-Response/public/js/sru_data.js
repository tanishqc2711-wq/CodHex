/**
 * ASTRA-ResQ
 * Northeast India Disaster Monitoring Data Store
 *
 * Focus:
 * - Northeast India
 * - Major cities
 * - Landslide risk zones
 * - Flood risk zones
 * - Emergency response hubs
 * - Geographic distances
 *
 * This file contains DATA ONLY.
 * The map renderer should read window.SRU_DATA.
 */

const SRU_DATA = {

    // ============================================================
    // NORTHEAST INDIA MAP CONFIGURATION
    // ============================================================

    campus: {

        name: 'Northeast India Disaster Monitoring Region',

        shortName: 'Northeast India',

        tagline: 'Landslide, Flood & Disaster Resilience Monitoring',

        // Geographic center of Northeast India
        center: [25.5, 93.5],

        // Initial map zoom
        defaultZoom: 6,

        // Geographic limits for Northeast-focused view
        bounds: [
            [21.5, 88.0],
            [29.5, 97.5]
        ],

        emergencyContacts: {
            nationalEmergency: '112',
            disasterHelpline: '1077',
            ambulance: '108'
        }
    },


    // ============================================================
    // MAJOR NORTHEAST INDIA CITIES
    // ============================================================

    buildings: [

        {
            id: 'guwahati',
            name: 'Guwahati',
            short: 'Guwahati',
            code: 'NE-CITY-01',
            type: 'city',
            coords: [26.1445, 91.7362],
            status: 'MONITORED'
        },

        {
            id: 'shillong',
            name: 'Shillong',
            short: 'Shillong',
            code: 'NE-CITY-02',
            type: 'city',
            coords: [25.5788, 91.8933],
            status: 'MONITORED'
        },

        {
            id: 'gangtok',
            name: 'Gangtok',
            short: 'Gangtok',
            code: 'NE-CITY-03',
            type: 'city',
            coords: [27.3389, 88.6065],
            status: 'MONITORED'
        },

        {
            id: 'kohima',
            name: 'Kohima',
            short: 'Kohima',
            code: 'NE-CITY-04',
            type: 'city',
            coords: [25.6751, 94.1086],
            status: 'MONITORED'
        },

        {
            id: 'imphal',
            name: 'Imphal',
            short: 'Imphal',
            code: 'NE-CITY-05',
            type: 'city',
            coords: [24.8170, 93.9368],
            status: 'MONITORED'
        },

        {
            id: 'aizawl',
            name: 'Aizawl',
            short: 'Aizawl',
            code: 'NE-CITY-06',
            type: 'city',
            coords: [23.7271, 92.7176],
            status: 'MONITORED'
        },

        {
            id: 'itanagar',
            name: 'Itanagar',
            short: 'Itanagar',
            code: 'NE-CITY-07',
            type: 'city',
            coords: [27.0844, 93.6053],
            status: 'MONITORED'
        },

        {
            id: 'agartala',
            name: 'Agartala',
            short: 'Agartala',
            code: 'NE-CITY-08',
            type: 'city',
            coords: [23.8315, 91.2868],
            status: 'MONITORED'
        }

    ],


    // ============================================================
    // LANDSLIDE-PRONE AREAS
    // ============================================================

    landslideZones: [

        {
            id: 'landslide-sikkim',

            name: 'Sikkim Himalayan Landslide Zone',

            coords: [27.5330, 88.5122],

            radius: 45000,

            type: 'LANDSLIDE_RISK',

            severity: 'HIGH',

            state: 'Sikkim',

            description:
                'Mountainous terrain with steep slopes and rainfall-triggered landslide susceptibility.'
        },

        {
            id: 'landslide-arunachal',

            name: 'Arunachal Pradesh Eastern Himalayan Landslide Zone',

            coords: [27.9000, 93.5000],

            radius: 80000,

            type: 'LANDSLIDE_RISK',

            severity: 'HIGH',

            state: 'Arunachal Pradesh',

            description:
                'Steep Himalayan terrain with elevated landslide susceptibility during intense rainfall.'
        },

        {
            id: 'landslide-meghalaya',

            name: 'Meghalaya Hills Landslide Zone',

            coords: [25.5000, 91.3000],

            radius: 55000,

            type: 'LANDSLIDE_RISK',

            severity: 'MEDIUM',

            state: 'Meghalaya',

            description:
                'Hilly terrain vulnerable to slope instability during prolonged or intense rainfall.'
        },

        {
            id: 'landslide-nagaland',

            name: 'Nagaland Hill Landslide Zone',

            coords: [26.0000, 94.5000],

            radius: 50000,

            type: 'LANDSLIDE_RISK',

            severity: 'MEDIUM',

            state: 'Nagaland',

            description:
                'Hilly terrain with localized landslide susceptibility.'
        },

        {
            id: 'landslide-mizoram',

            name: 'Mizoram Hill Landslide Zone',

            coords: [23.5000, 92.8000],

            radius: 60000,

            type: 'LANDSLIDE_RISK',

            severity: 'HIGH',

            state: 'Mizoram',

            description:
                'Steep hill slopes vulnerable to rainfall-induced slope failures.'
        },

        {
            id: 'landslide-manipur',

            name: 'Manipur Hill Landslide Zone',

            coords: [24.9000, 93.8000],

            radius: 45000,

            type: 'LANDSLIDE_RISK',

            severity: 'MEDIUM',

            state: 'Manipur',

            description:
                'Hilly regions with increased landslide susceptibility during heavy rainfall.'
        }

    ],


    // ============================================================
    // FLOOD-PRONE AREAS
    // ============================================================

    hazardZones: [

        {
            id: 'flood-assam-brahmaputra',

            name: 'Brahmaputra Flood Risk Zone',

            coords: [26.2000, 91.7000],

            radius: 100000,

            type: 'FLOOD_RISK',

            severity: 'HIGH',

            state: 'Assam',

            description:
                'Flood-prone Brahmaputra basin region.'
        },

        {
            id: 'flood-barak-valley',

            name: 'Barak Valley Flood Risk Zone',

            coords: [24.8000, 92.8000],

            radius: 60000,

            type: 'FLOOD_RISK',

            severity: 'MEDIUM',

            state: 'Assam',

            description:
                'Low-lying areas vulnerable to heavy rainfall and river flooding.'
        },

        {
            id: 'flood-tripura',

            name: 'Tripura Heavy Rainfall & Flood Zone',

            coords: [23.9000, 91.6000],

            radius: 50000,

            type: 'FLOOD_RISK',

            severity: 'MEDIUM',

            state: 'Tripura',

            description:
                'Flood susceptibility increases during prolonged heavy rainfall.'
        }

    ],


    // ============================================================
    // CITY NAVIGATION GRAPH
    // ============================================================

    navGraph: {

        nodes: [

            {
                id: 'N_GUWAHATI',
                coords: [26.1445, 91.7362],
                name: 'Guwahati'
            },

            {
                id: 'N_SHILLONG',
                coords: [25.5788, 91.8933],
                name: 'Shillong'
            },

            {
                id: 'N_KOHIMA',
                coords: [25.6751, 94.1086],
                name: 'Kohima'
            },

            {
                id: 'N_IMPHAL',
                coords: [24.8170, 93.9368],
                name: 'Imphal'
            },

            {
                id: 'N_AIZAWL',
                coords: [23.7271, 92.7176],
                name: 'Aizawl'
            },

            {
                id: 'N_ITANAGAR',
                coords: [27.0844, 93.6053],
                name: 'Itanagar'
            },

            {
                id: 'N_GANGTOK',
                coords: [27.3389, 88.6065],
                name: 'Gangtok'
            },

            {
                id: 'N_AGARTALA',
                coords: [23.8315, 91.2868],
                name: 'Agartala'
            }

        ],

        // Geographic connections between monitored cities
        edges: [

            ['N_GUWAHATI', 'N_SHILLONG'],

            ['N_GUWAHATI', 'N_ITANAGAR'],

            ['N_GUWAHATI', 'N_KOHIMA'],

            ['N_SHILLONG', 'N_AGARTALA'],

            ['N_SHILLONG', 'N_AIZAWL'],

            ['N_KOHIMA', 'N_IMPHAL'],

            ['N_IMPHAL', 'N_AIZAWL'],

            ['N_ITANAGAR', 'N_GANGTOK'],

            ['N_GUWAHATI', 'N_GANGTOK']

        ]
    },


    // ============================================================
    // NORTHEAST INDIA EMERGENCY RESPONSE HUBS
    // ============================================================

    regionalHubs: [

        {
            id: 'hub-guwahati',

            name: 'Guwahati Emergency Response Hub',

            type: 'Regional Emergency Hub',

            coords: [26.1445, 91.7362],

            status: 'READY'
        },

        {
            id: 'hub-shillong',

            name: 'Shillong Emergency Response Hub',

            type: 'Regional Emergency Hub',

            coords: [25.5788, 91.8933],

            status: 'READY'
        },

        {
            id: 'hub-gangtok',

            name: 'Gangtok Disaster Response Hub',

            type: 'Mountain Disaster Response',

            coords: [27.3389, 88.6065],

            status: 'READY'
        },

        {
            id: 'hub-aizawl',

            name: 'Aizawl Emergency Response Hub',

            type: 'Regional Emergency Hub',

            coords: [23.7271, 92.7176],

            status: 'READY'
        }

    ],


    // ============================================================
    // CURRENT / DEMO NORTHEAST HAZARD FEED
    // ============================================================

    nationalHazards: [

        {
            id: 'ne-landslide-alert',

            name: 'Northeast India Landslide Watch',

            coords: [27.0000, 92.5000],

            category: 'LANDSLIDE',

            alertLevel: 'ORANGE',

            description:
                'Multiple mountainous areas across Northeast India are under landslide monitoring.'
        },

        {
            id: 'ne-heavy-rain',

            name: 'Northeast India Heavy Rainfall Watch',

            coords: [26.0000, 92.0000],

            category: 'HEAVY_RAIN',

            alertLevel: 'YELLOW',

            description:
                'Heavy rainfall may increase flood and landslide risk in vulnerable terrain.'
        }

    ],


    // ============================================================
    // EMERGENCY RESOURCES
    // ============================================================

    resources: {

        northeastRegion: {

            monitoredStates: 8,

            majorCities: 8,

            landslideZones: 6,

            floodZones: 3,

            emergencyHubs: 4,

            disasterResponseTeams: 12,

            rescueBoats: 18,

            emergencyVehicles: 24,

            medicalUnits: 16,

            emergencyShelters: 32,

            satelliteCommunicationUnits: 10,

            trainedResponders: 450

        }

    }

};


// ============================================================
// GEOGRAPHIC DISTANCE UTILITIES
// ============================================================

/**
 * Calculate straight-line geographic distance
 * between two latitude/longitude coordinates.
 *
 * Returns distance in kilometres.
 */
function calculateGeoDistance(coords1, coords2) {

    const earthRadiusKm = 6371;

    const lat1 = coords1[0] * Math.PI / 180;
    const lon1 = coords1[1] * Math.PI / 180;

    const lat2 = coords2[0] * Math.PI / 180;
    const lon2 = coords2[1] * Math.PI / 180;

    const deltaLat = lat2 - lat1;
    const deltaLon = lon2 - lon1;

    const a =
        Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
        Math.cos(lat1) *
        Math.cos(lat2) *
        Math.sin(deltaLon / 2) *
        Math.sin(deltaLon / 2);

    const c =
        2 * Math.atan2(
            Math.sqrt(a),
            Math.sqrt(1 - a)
        );

    return earthRadiusKm * c;
}


/**
 * Get two monitored cities by ID.
 */
function getNECity(cityId) {

    return SRU_DATA.buildings.find(
        city => city.id === cityId
    );

}


/**
 * Calculate distance between two monitored cities.
 *
 * Example:
 * getCityDistance('guwahati', 'shillong')
 */
function getCityDistance(city1Id, city2Id) {

    const city1 = getNECity(city1Id);
    const city2 = getNECity(city2Id);

    if (!city1 || !city2) {
        return null;
    }

    return calculateGeoDistance(
        city1.coords,
        city2.coords
    );

}


/**
 * Return formatted distance.
 */
function getFormattedCityDistance(city1Id, city2Id) {

    const distance = getCityDistance(
        city1Id,
        city2Id
    );

    if (distance === null) {
        return 'Distance unavailable';
    }

    return `${distance.toFixed(1)} km`;

}


/**
 * Add calculated geographic distance to every
 * navigation edge.
 */
function getNavigationRoutesWithDistance() {

    return SRU_DATA.navGraph.edges.map(edge => {

        const city1 = SRU_DATA.navGraph.nodes.find(
            node => node.id === edge[0]
        );

        const city2 = SRU_DATA.navGraph.nodes.find(
            node => node.id === edge[1]
        );

        if (!city1 || !city2) {
            return {
                from: edge[0],
                to: edge[1],
                distanceKm: null
            };
        }

        return {
            from: city1.name,
            to: city2.name,

            fromId: city1.id,
            toId: city2.id,

            distanceKm: Number(
                calculateGeoDistance(
                    city1.coords,
                    city2.coords
                ).toFixed(2)
            ),

            distance: `${calculateGeoDistance(
                city1.coords,
                city2.coords
            ).toFixed(1)} km`
        };

    });

}


// ============================================================
// MAKE DATA AND UTILITIES AVAILABLE TO THE WEBSITE
// ============================================================

if (typeof window !== 'undefined') {

    window.SRU_DATA = SRU_DATA;

    window.calculateGeoDistance = calculateGeoDistance;

    window.getNECity = getNECity;

    window.getCityDistance = getCityDistance;

    window.getFormattedCityDistance = getFormattedCityDistance;

    window.getNavigationRoutesWithDistance =
        getNavigationRoutesWithDistance;

}