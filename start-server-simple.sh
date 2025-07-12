#!/bin/bash

# Klea Dev Portfolio Server Startup Script (Simple Version)
# This script builds and starts the portfolio server without requiring sudo

echo "🚀 Starting Klea Dev Portfolio Server (Simple Mode)..."

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

# Check if PM2 is available
if command -v pm2 &> /dev/null; then
    echo "📦 PM2 found, using PM2 for production deployment..."
    
    # Stop any existing PM2 processes
    echo "🛑 Stopping existing processes..."
    pm2 stop klea-portfolio 2>/dev/null || true
    pm2 delete klea-portfolio 2>/dev/null || true

    # Start the application with PM2
    echo "🚀 Starting application with PM2..."
    pm2 start ecosystem.config.js --env production

    # Save PM2 configuration
    pm2 save

    echo "✅ Server is running with PM2!"
    echo "🌐 Access your portfolio at:"
    echo "   Local: http://localhost:3000"
    echo "   Network: http://$(hostname -I | awk '{print $1}'):3000"
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
    echo "📦 PM2 not found, using direct Next.js server..."
    echo "🚀 Starting application directly..."
    
    # Start the application directly
    echo "✅ Server is running!"
    echo "🌐 Access your portfolio at:"
    echo "   Local: http://localhost:3000"
    echo "   Network: http://$(hostname -I | awk '{print $1}'):3000"
    echo ""
    echo "🔧 To stop the server: Ctrl+C"
    echo "🔧 To run in background: nohup npm start &"
    echo ""
    echo "💡 For production deployment, install PM2:"
    echo "   npm install -g pm2"
    echo ""
    npm start
fi 