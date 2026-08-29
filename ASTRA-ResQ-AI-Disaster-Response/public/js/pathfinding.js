/**
 * ASTRA-ResQ: A* Dynamic Evacuation Pathfinding Engine
 * Computes obstacle-free, hazard-avoiding escape corridors on SR University campus.
 */

class CampusPathfindingEngine {
    constructor(navGraph) {
        this.graph = navGraph || (typeof window !== 'undefined' && window.SRU_DATA && window.SRU_DATA.navGraph);
        this.blockedNodes = new Set();
    }

    setGraph(graph) {
        this.graph = graph;
    }

    setNodeObstacle(nodeId, isBlocked) {
        if (isBlocked) {
            this.blockedNodes.add(nodeId);
        } else {
            this.blockedNodes.delete(nodeId);
        }
    }

    clearObstacles() {
        this.blockedNodes.clear();
    }

    heuristic(nodeA, nodeB) {
        const dLat = nodeA.coords[0] - nodeB.coords[0];
        const dLng = nodeA.coords[1] - nodeB.coords[1];
        return Math.sqrt(dLat * dLat + dLng * dLng) * 111000;
    }

    getNode(nodeId) {
        if (!this.graph || !this.graph.nodes) return null;
        return this.graph.nodes.find(n => n.id === nodeId);
    }

    getNeighbors(nodeId) {
        const neighbors = [];
        if (!this.graph || !this.graph.edges) return neighbors;
        this.graph.edges.forEach(([u, v]) => {
            if (u === nodeId && !this.blockedNodes.has(v)) neighbors.push(v);
            else if (v === nodeId && !this.blockedNodes.has(u)) neighbors.push(u);
        });
        return neighbors;
    }

    findNearestNode(lat, lng) {
        if (!this.graph || !this.graph.nodes) return null;
        let nearest = null;
        let minDist = Infinity;
        this.graph.nodes.forEach(node => {
            const dLat = node.coords[0] - lat;
            const dLng = node.coords[1] - lng;
            const dist = dLat * dLat + dLng * dLng;
            if (dist < minDist) {
                minDist = dist;
                nearest = node;
            }
        });
        return nearest;
    }

    findSafeRoute(startNodeId, targetSafeZoneId = null) {
        if (!this.graph) {
            this.graph = window.SRU_DATA && window.SRU_DATA.navGraph;
        }
        if (!this.graph) return null;

        let validTargets = [];
        if (targetSafeZoneId) {
            validTargets = [targetSafeZoneId];
        } else {
            validTargets = ['N_SAFE_ALPHA', 'N_SAFE_BETA', 'N_SAFE_GAMMA'].filter(id => !this.blockedNodes.has(id));
        }

        if (validTargets.length === 0) {
            console.error('All campus safe assembly points are blocked!');
            return null;
        }

        let bestPath = null;
        let shortestDist = Infinity;

        validTargets.forEach(destId => {
            const path = this.runAStar(startNodeId, destId);
            if (path && path.distance < shortestDist) {
                shortestDist = path.distance;
                bestPath = path;
            }
        });

        return bestPath;
    }

    runAStar(startId, endId) {
        const startNode = this.getNode(startId);
        const endNode = this.getNode(endId);
        if (!startNode || !endNode) return null;

        const openSet = [startId];
        const cameFrom = {};

        const gScore = {};
        const fScore = {};

        this.graph.nodes.forEach(n => {
            gScore[n.id] = Infinity;
            fScore[n.id] = Infinity;
        });

        gScore[startId] = 0;
        fScore[startId] = this.heuristic(startNode, endNode);

        while (openSet.length > 0) {
            let current = openSet[0];
            let lowestF = fScore[current];
            let currentIdx = 0;

            for (let i = 1; i < openSet.length; i++) {
                const id = openSet[i];
                if (fScore[id] < lowestF) {
                    lowestF = fScore[id];
                    current = id;
                    currentIdx = i;
                }
            }

            if (current === endId) {
                const pathNodeIds = [current];
                let curr = current;
                while (cameFrom[curr]) {
                    curr = cameFrom[curr];
                    pathNodeIds.unshift(curr);
                }

                const pathCoords = pathNodeIds.map(id => this.getNode(id).coords);
                const pathNames = pathNodeIds.map(id => this.getNode(id).name);

                return {
                    nodeIds: pathNodeIds,
                    coords: pathCoords,
                    names: pathNames,
                    distance: Math.round(gScore[endId]),
                    estimatedTimeMin: Math.max(1, Math.round(gScore[endId] / 65)),
                    destination: endNode.name
                };
            }

            openSet.splice(currentIdx, 1);
            const currentNode = this.getNode(current);

            const neighbors = this.getNeighbors(current);
            for (const neighborId of neighbors) {
                const neighborNode = this.getNode(neighborId);
                const stepCost = this.heuristic(currentNode, neighborNode);
                const tentativeGScore = gScore[current] + stepCost;

                if (tentativeGScore < gScore[neighborId]) {
                    cameFrom[neighborId] = current;
                    gScore[neighborId] = tentativeGScore;
                    fScore[neighborId] = tentativeGScore + this.heuristic(neighborNode, endNode);

                    if (!openSet.includes(neighborId)) {
                        openSet.push(neighborId);
                    }
                }
            }
        }

        return null;
    }
}

window.PathfindingEngine = new CampusPathfindingEngine();
