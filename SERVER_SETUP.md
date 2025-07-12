# 🚀 Klea Dev Portfolio Server Setup

A complete production server setup for your portfolio with Nginx, PM2, and auto-start capabilities.

## 📋 What's Included

- **Nginx** - Reverse proxy with caching and compression
- **PM2** - Process manager for Node.js apps
- **Auto-start** - Systemd service for boot-time startup
- **Management scripts** - Easy start/stop/restart commands

## 🛠️ Quick Start

### 1. Start the Server
```bash
./start-server.sh
```

### 2. Manage the Server
```bash
./manage-server.sh [command]
```

Available commands:
- `start` - Start the server
- `stop` - Stop the server  
- `restart` - Restart the server
- `status` - Show server status
- `logs` - Show PM2 logs
- `monitor` - Open PM2 monitor
- `enable` - Enable auto-start on boot
- `disable` - Disable auto-start on boot

### 3. Access Your Portfolio

**Local Access:**
```
http://localhost
```

**Network Access:**
```
http://[YOUR_IP_ADDRESS]
```

To find your IP:
```bash
ip addr show | grep "inet " | grep -v 127.0.0.1
```

## 🔧 Configuration Files

- `ecosystem.config.js` - PM2 configuration
- `nginx.conf` - Nginx server configuration
- `klea-portfolio.service` - Systemd service file

## 📊 Monitoring

### PM2 Commands
```bash
pm2 status          # Check process status
pm2 logs klea-portfolio    # View logs
pm2 monit           # Open monitoring dashboard
pm2 restart klea-portfolio # Restart the app
```

### Nginx Commands
```bash
sudo systemctl status nginx    # Check Nginx status
sudo nginx -t                  # Test configuration
sudo systemctl restart nginx   # Restart Nginx
```

## 🔒 Security Features

- **Security headers** - XSS protection, frame options, etc.
- **Gzip compression** - Faster loading times
- **Static file caching** - Optimized performance
- **Proxy headers** - Proper forwarding of client info

## 🚀 Auto-Start Setup

To enable auto-start on boot:
```bash
./manage-server.sh enable
```

To disable auto-start:
```bash
./manage-server.sh disable
```

## 🔍 Troubleshooting

### Check Server Status
```bash
./manage-server.sh status
```

### View Logs
```bash
./manage-server.sh logs
```

### Restart Everything
```bash
./manage-server.sh restart
```

### Manual PM2 Commands
```bash
pm2 stop klea-portfolio
pm2 delete klea-portfolio
pm2 start ecosystem.config.js --env production
```

## 🌟 Features

- ✅ **Production-ready** - Optimized for performance
- ✅ **Auto-restart** - PM2 handles crashes
- ✅ **Caching** - Nginx caches static files
- ✅ **Compression** - Gzip compression enabled
- ✅ **Security** - Proper security headers
- ✅ **Monitoring** - PM2 monitoring dashboard
- ✅ **Auto-start** - Starts on system boot
- ✅ **Easy management** - Simple scripts for control

## 💜 Enjoy Your Portfolio!

Your portfolio is now running as a proper production server with all the bells and whistles! Share your IP address with anyone on your network to show off your amazing work! ✨ 