/**
 * ASTRA-ResQ: Geospatial Map Engine (Leaflet + Custom GeoJSON / Vector Overlays)
 * Focus: SR University Warangal Campus, Warangal District & Pan-India Hazards
 */

class DisasterMapEngine {
    constructor() {
        this.map = null;
        this.currentView = 'sru'; // 'sru' | 'warangal' | 'india'
        this.layerGroups = {
            buildings: null,
            safeZones: null,
            hazardZones: null,
            evacRoute: null,
            regionalHubs: null,
            nationalHazards: null,
            drones: null
        };
        this.routePolyline = null;
        this.activeDroneMarkers = [];
    }

    init(mapContainerId = 'map') {
        if (!document.getElementById(mapContainerId)) return;

        // Base tile options - high-contrast dark / tactical map
        this.map = L.map(mapContainerId, {
            center: [18.0683, 79.5447], // SR University Warangal
            zoom: 17,
            zoomControl: false,
            attributionControl: false
        });

        // Add sleek dark CartoDB / OSM tiles
        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
            maxZoom: 19,
            subdomains: 'abcd'
        }).addTo(this.map);

        L.control.zoom({ position: 'bottomright' }).addTo(this.map);

        // Initialize Layer Groups
        for (const key in this.layerGroups) {
            this.layerGroups[key] = L.layerGroup().addTo(this.map);
        }

        // Render layers
        this.renderSRUCampus();
        this.renderRegionalHubs();
        this.renderNationalHazards();
        this.renderDroneFleet();

        console.log('Disaster Map Engine initialized at SR University Warangal!');
    }

    flyTo(target) {
        if (!this.map) return;
        if (target === 'sru') {
            this.currentView = 'sru';
            this.map.flyTo([18.0683, 79.5447], 17, { duration: 1.5 });
        } else if (target === 'warangal') {
            this.currentView = 'warangal';
            this.map.flyTo([18.0050, 79.5800], 12, { duration: 1.8 });
        } else if (target === 'india') {
            this.currentView = 'india';
            this.map.flyTo([21.8000, 80.5000], 5, { duration: 2.2 });
        }
        if (window.AudioSynth) window.AudioSynth.playSonarPing();
    }

    renderSRUCampus() {
        if (!window.SRU_DATA) return;
        const data = window.SRU_DATA;

        // 1. Campus Boundary Outline
        const campusPolygon = [
            [18.0725, 79.5420],
            [18.0725, 79.5475],
            [18.0650, 79.5480],
            [18.0645, 79.5415]
        ];
        L.polygon(campusPolygon, {
            color: '#3b82f6',
            weight: 2,
            dashArray: '6, 6',
            fillColor: '#3b82f6',
            fillOpacity: 0.05
        }).addTo(this.layerGroups.buildings).bindTooltip('SR University Warangal Campus Perimeter', { sticky: true });

        // 2. Campus Buildings
        data.buildings.forEach(b => {
            let markerColor = '#3b82f6';
            let iconText = '??';
            if (b.type === 'medical') { markerColor = '#ef4444'; iconText = '??'; }
            else if (b.type === 'assembly') { markerColor = '#10b981'; iconText = '???'; }
            else if (b.type === 'residential') { markerColor = '#8b5cf6'; iconText = '??'; }
            else if (b.type === 'utility') { markerColor = '#f59e0b'; iconText = '?'; }

            const customIcon = L.divIcon({
                className: 'custom-map-pin',
                html: `<div class="building-marker" style="border-color: ${markerColor};">
                        <span class="marker-emoji">${iconText}</span>
                        <div class="marker-badge">${b.code || ''}</div>
                       </div>`,
                iconSize: [36, 36],
                iconAnchor: [18, 18]
            });

            const marker = L.marker(b.coords, { icon: customIcon }).addTo(this.layerGroups.buildings);

            const popupContent = `
                <div class="map-popup-card">
                    <div class="popup-header">
                        <span class="popup-badge" style="background: ${markerColor}20; color: ${markerColor};">${b.type.toUpperCase()}</span>
                        <span class="popup-status status-${b.status.toLowerCase()}">${b.status}</span>
                    </div>
                    <h3 class="popup-title">${b.name}</h3>
                    <p class="popup-desc">${b.short} (${b.code})</p>
                    <div class="popup-grid">
                        <div class="popup-stat"><label>Occupancy</label><span>${b.currentOccupancy} / ${b.capacity}</span></div>
                        <div class="popup-stat"><label>Floors</label><span>${b.floors} Floors</span></div>
                        <div class="popup-stat"><label>Power</label><span class="text-green">${b.power}</span></div>
                        <div class="popup-stat"><label>Waterlog</label><span>${b.waterlogged ? '?? YES' : 'CLEAN'}</span></div>
                    </div>
                    <div class="popup-actions">
                        <button onclick="window.planEvacuationFrom('${b.id}')" class="btn-evac-route">
                            <i class="lucide-navigation"></i> Plan Evacuation Route
                        </button>
                    </div>
                </div>
            `;
            marker.bindPopup(popupContent, { maxWidth: 300 });
        });

        // 3. Safe Assembly Zones
        data.safeZones.forEach(sz => {
            const circle = L.circle(sz.coords, {
                radius: sz.radius,
                color: '#10b981',
                weight: 2,
                fillColor: '#10b981',
                fillOpacity: 0.25
            }).addTo(this.layerGroups.safeZones);

            const icon = L.divIcon({
                className: 'safe-zone-icon',
                html: `<div class="safe-pulsing-node">???</div>`,
                iconSize: [28, 28],
                iconAnchor: [14, 14]
            });

            L.marker(sz.coords, { icon }).addTo(this.layerGroups.safeZones)
                .bindTooltip(`<b>SAFE ZONE: ${sz.short}</b><br>Capacity: ${sz.capacity} Persons`, { permanent: false });
        });

        // 4. Hazard Zones
        data.hazardZones.forEach(hz => {
            L.circle(hz.coords, {
                radius: hz.radius,
                color: '#ef4444',
                weight: 2,
                dashArray: '4, 4',
                fillColor: '#ef4444',
                fillOpacity: 0.2
            }).addTo(this.layerGroups.hazardZones).bindPopup(`
                <div class="hazard-popup">
                    <h4 class="text-red-500 font-bold">?? ${hz.name}</h4>
                    <p class="text-xs mt-1">${hz.description}</p>
                    <span class="badge-danger mt-2 inline-block">SEVERITY: ${hz.severity}</span>
                </div>
            `);
        });
    }

    renderRegionalHubs() {
        if (!window.SRU_DATA) return;
        window.SRU_DATA.regionalHubs.forEach(hub => {
            let iconStr = '??';
            if (hub.type.includes('Police')) iconStr = '??';
            else if (hub.type.includes('Fire') || hub.type.includes('SDRF')) iconStr = '??';
            else if (hub.type.includes('Gauge')) iconStr = '??';

            const icon = L.divIcon({
                className: 'regional-hub-icon',
                html: `<div class="hub-pin">${iconStr}</div>`,
                iconSize: [30, 30],
                iconAnchor: [15, 15]
            });

            L.marker(hub.coords, { icon }).addTo(this.layerGroups.regionalHubs)
                .bindPopup(`
                    <div class="hub-popup">
                        <h4 class="font-bold">${hub.name}</h4>
                        <p class="text-xs text-muted">${hub.type}</p>
                        <p class="text-xs mt-1"><b>Distance from SRU:</b> ${hub.distanceFromSRU || 'In District'}</p>
                        ${hub.waterLevelMeters ? `<p class="text-xs text-blue-500 font-bold mt-1">Water Level: ${hub.waterLevelMeters}m (Danger: ${hub.dangerLevelMeters}m)</p>` : ''}
                        ${hub.phone ? `<p class="text-xs text-emerald-500 font-mono mt-1">Emergency: ${hub.phone}</p>` : ''}
                    </div>
                `);
        });
    }

    renderNationalHazards() {
        if (!window.SRU_DATA) return;
        window.SRU_DATA.nationalHazards.forEach(nh => {
            const circle = L.circle(nh.coords, {
                radius: nh.impactZoneRadius || 80000,
                color: nh.alertLevel === 'RED' ? '#ef4444' : '#f59e0b',
                weight: 2,
                fillColor: nh.alertLevel === 'RED' ? '#ef4444' : '#f59e0b',
                fillOpacity: 0.15
            }).addTo(this.layerGroups.nationalHazards);

            const icon = L.divIcon({
                className: 'national-hazard-icon',
                html: `<div class="national-hazard-pin">??</div>`,
                iconSize: [28, 28],
                iconAnchor: [14, 14]
            });

            L.marker(nh.coords, { icon }).addTo(this.layerGroups.nationalHazards)
                .bindPopup(`
                    <div class="national-hazard-popup">
                        <span class="badge-alert-${nh.alertLevel.toLowerCase()}">${nh.alertLevel} ALERT</span>
                        <h4 class="font-bold mt-1">${nh.name}</h4>
                        <p class="text-xs text-muted mt-1"><b>Category:</b> ${nh.category}</p>
                        <p class="text-xs text-amber-400 mt-1">${nh.imdsAlert}</p>
                    </div>
                `);
        });
    }

    renderDroneFleet() {
        const droneCoords = [
            { id: 'DRONE-01', name: 'Eagle-Eye Thermal Alpha', coords: [18.0690, 79.5440], alt: '85m', batt: '94%' },
            { id: 'DRONE-02', name: 'ResQ-Surveyor Beta', coords: [18.0665, 79.5455], alt: '60m', batt: '88%' }
        ];

        droneCoords.forEach(d => {
            const icon = L.divIcon({
                className: 'drone-marker',
                html: `<div class="drone-icon-wrapper"><span class="drone-symbol">??</span><div class="drone-radar-sweep"></div></div>`,
                iconSize: [32, 32],
                iconAnchor: [16, 16]
            });

            const marker = L.marker(d.coords, { icon }).addTo(this.layerGroups.drones)
                .bindTooltip(`<b>${d.name}</b><br>Alt: ${d.alt} | Battery: ${d.batt}`, { sticky: true });
            this.activeDroneMarkers.push(marker);
        });
    }

    drawEvacuationRoute(pathResult) {
        if (!pathResult || !pathResult.coords) return;
        this.layerGroups.evacRoute.clearLayers();

        this.routePolyline = L.polyline(pathResult.coords, {
            color: '#10b981',
            weight: 6,
            opacity: 0.9,
            dashArray: '10, 10',
            lineCap: 'round',
            lineJoin: 'round'
        }).addTo(this.layerGroups.evacRoute);

        const startIcon = L.divIcon({
            className: 'evac-start-icon',
            html: `<div class="evac-dot start-dot">?????</div>`,
            iconSize: [24, 24],
            iconAnchor: [12, 12]
        });

        const endIcon = L.divIcon({
            className: 'evac-end-icon',
            html: `<div class="evac-dot end-dot">??</div>`,
            iconSize: [24, 24],
            iconAnchor: [12, 12]
        });

        L.marker(pathResult.coords[0], { icon: startIcon }).addTo(this.layerGroups.evacRoute);
        L.marker(pathResult.coords[pathResult.coords.length - 1], { icon: endIcon }).addTo(this.layerGroups.evacRoute);

        this.map.fitBounds(this.routePolyline.getBounds(), { padding: [60, 60] });
    }

    clearEvacuationRoute() {
        if (this.layerGroups.evacRoute) {
            this.layerGroups.evacRoute.clearLayers();
        }
    }
}

window.DisasterMap = new DisasterMapEngine();
