#!/bin/bash

# Klea Dev Portfolio Server Management Script

case "$1" in
    start)
        echo "🚀 Starting Klea Dev Portfolio Server..."
        ./start-server.sh
        ;;
    stop)
        echo "🛑 Stopping Klea Dev Portfolio Server..."
        ./stop-server.sh
        ;;
    restart)
        echo "🔄 Restarting Klea Dev Portfolio Server..."
        ./stop-server.sh
        sleep 2
        ./start-server.sh
        ;;
    status)
        echo "📊 Server Status:"
        echo "PM2 Status:"
        pm2 status klea-portfolio 2>/dev/null || echo "PM2 process not running"
        echo ""
        echo "Nginx Status:"
        sudo systemctl status nginx --no-pager -l
        echo ""
        echo "Network Access:"
        IP=$(ip addr show | grep "inet " | grep -v 127.0.0.1 | awk '{print $2}' | cut -d/ -f1 | head -n1)
        echo "Local: http://localhost"
        echo "Network: http://$IP"
        ;;
    logs)
        echo "📋 PM2 Logs:"
        pm2 logs klea-portfolio --lines 50
        ;;
    monitor)
        echo "📊 PM2 Monitor:"
        pm2 monit
        ;;
    enable)
        echo "🔧 Enabling auto-start on boot..."
        sudo systemctl enable klea-portfolio.service
        echo "✅ Service will now start automatically on boot!"
        ;;
    disable)
        echo "🔧 Disabling auto-start on boot..."
        sudo systemctl disable klea-portfolio.service
        echo "✅ Service will no longer start automatically on boot!"
        ;;
    *)
        echo "💜 Klea Dev Portfolio Server Management"
        echo ""
        echo "Usage: $0 {start|stop|restart|status|logs|monitor|enable|disable}"
        echo ""
        echo "Commands:"
        echo "  start    - Start the server"
        echo "  stop     - Stop the server"
        echo "  restart  - Restart the server"
        echo "  status   - Show server status"
        echo "  logs     - Show PM2 logs"
        echo "  monitor  - Open PM2 monitor"
        echo "  enable   - Enable auto-start on boot"
        echo "  disable  - Disable auto-start on boot"
        echo ""
        echo "🌐 Access your portfolio at:"
        IP=$(ip addr show | grep "inet " | grep -v 127.0.0.1 | awk '{print $2}' | cut -d/ -f1 | head -n1)
        echo "   Local: http://localhost"
        echo "   Network: http://$IP"
        ;;
esac 