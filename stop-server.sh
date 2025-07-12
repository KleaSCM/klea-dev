#!/bin/bash

# Klea Dev Portfolio Server Stop Script

echo "🛑 Stopping Klea Dev Portfolio Server..."

# Stop PM2 processes
echo "🛑 Stopping PM2 processes..."
pm2 stop klea-portfolio 2>/dev/null || true
pm2 delete klea-portfolio 2>/dev/null || true

# Stop Nginx
echo "🌐 Stopping Nginx..."
sudo systemctl stop nginx

echo "✅ Server stopped!"
echo ""
echo "🔧 To start again: ./start-server.sh" 