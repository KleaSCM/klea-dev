#!/bin/bash

# Klea Dev Portfolio Server Startup Script
# This script builds and starts the portfolio server with PM2 and Nginx

echo "🚀 Starting Klea Dev Portfolio Server..."

# Get the current directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Make sure you're in the project directory."
    exit 1
fi

# Install dependencies if needed
echo "📦 Installing dependencies..."
npm install

# Build the application
echo "🔨 Building the application..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed! Please fix the errors and try again."
    exit 1
fi

# Install PM2 globally if not already installed
if ! command -v pm2 &> /dev/null; then
    echo "📦 Installing PM2..."
    sudo npm install -g pm2
fi

# Stop any existing PM2 processes
echo "🛑 Stopping existing processes..."
pm2 stop klea-portfolio 2>/dev/null || true
pm2 delete klea-portfolio 2>/dev/null || true

# Start the application with PM2
echo "🚀 Starting application with PM2..."
pm2 start ecosystem.config.js --env production

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup

# Copy Nginx configuration
echo "🔧 Setting up Nginx..."
sudo cp nginx.conf /etc/nginx/sites-available/klea-portfolio
sudo ln -sf /etc/nginx/sites-available/klea-portfolio /etc/nginx/sites-enabled/

# Remove default nginx site
sudo rm -f /etc/nginx/sites-enabled/default

# Test Nginx configuration
sudo nginx -t

if [ $? -eq 0 ]; then
    # Start Nginx
    echo "🌐 Starting Nginx..."
    sudo systemctl enable nginx
    sudo systemctl start nginx
    
    # Get IP address
    IP=$(ip addr show | grep "inet " | grep -v 127.0.0.1 | awk '{print $2}' | cut -d/ -f1 | head -n1)
    
    echo "✅ Server is running!"
    echo "🌐 Access your portfolio at:"
    echo "   Local: http://localhost"
    echo "   Network: http://$IP"
    echo ""
    echo "📊 PM2 Status:"
    pm2 status
    echo ""
    echo "🔧 To manage the server:"
    echo "   Stop: pm2 stop klea-portfolio"
    echo "   Restart: pm2 restart klea-portfolio"
    echo "   Logs: pm2 logs klea-portfolio"
    echo "   Monitor: pm2 monit"
else
    echo "❌ Nginx configuration test failed!"
    exit 1
fi 