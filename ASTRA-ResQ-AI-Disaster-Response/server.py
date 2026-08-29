#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
ASTRA-ResQ: AI Disaster Response Backend & Static Server
Author: Google DeepMind Pair Programmer
Platform: Python 3.10+ / 3.14+
"""

import http.server
import socketserver
import os
import json

PORT = int(os.environ.get("PORT", 8000))
DIRECTORY = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'public')

class DisasterResponseHTTPHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def do_GET(self):
        # REST API endpoint for real-time telemetry
        if self.path == '/api/status':
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            status_data = {
                "system": "ASTRA-ResQ AI Disaster Command",
                "version": "2.4.0",
                "campus": "SR University, Warangal, Telangana, India",
                "coordinates": [18.0683, 79.5447],
                "status": "OPERATIONAL",
                "threatLevel": "NORMAL",
                "sensors": {
                    "waddepallyWaterLevelM": 8.4,
                    "rainfallMmHr": 14,
                    "tempC": 32.4,
                    "windSpeedKmH": 18
                }
            }
            self.wfile.write(json.dumps(status_data).encode('utf-8'))
            return
        return super().do_GET()

    def do_POST(self):
        # REST API endpoint for Citizen SOS relay
        if self.path == '/api/sos':
            content_length = int(self.headers.get('Content-Length', 0))
            post_data = self.rfile.read(content_length)
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            response = {
                "status": "DISPATCHED",
                "message": "SOS beacon received. Paramedic units and SRU rescue marshals dispatched."
            }
            self.wfile.write(json.dumps(response).encode('utf-8'))
            return
        return super().do_POST()

def run_server():
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("0.0.0.0", PORT), DisasterResponseHTTPHandler) as httpd:
        url = f"http://127.0.0.1:{PORT}"
        print("=" * 70)
        print("🚀 ASTRA-ResQ AI Disaster Response Command Center is LIVE!")
        print(f"📍 Location Focus: SR University, Warangal, Telangana, India")
        print(f"🌐 Access Web Dashboard: {url}")
        print("=" * 70)
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down ASTRA-ResQ server gracefully.")
            httpd.server_close()

if __name__ == '__main__':
    run_server()