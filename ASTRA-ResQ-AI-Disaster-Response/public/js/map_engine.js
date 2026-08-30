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
            coords: [26.1445, 91.7362]
        },]}