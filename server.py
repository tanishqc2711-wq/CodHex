#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import http.server
import socketserver
import os
import json

PORT = 8000
DIRECTORY = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'public')

class DisasterResponseHTTPHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def do_GET(self):
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
        if self.path == '/api/sos':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            response = {
                "status": "DISPATCHED",
                "message": "SOS beacon received. Paramedic units and SRU marshals dispatched."
            }
            self.wfile.write(json.dumps(response).encode('utf-8'))
            return
        return super().do_POST()

def run_server():
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), DisasterResponseHTTPHandler) as httpd:
        print("ASTRA-ResQ server listening on port", PORT)
        httpd.serve_forever()

if __name__ == '__main__':
    run_server()
