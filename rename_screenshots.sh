#!/bin/bash

# Screenshot Renaming Script for Portfolio Visuals
# This script renames the screenshot files to match project and research themes

echo "🎨 Renaming screenshots for portfolio visuals..."
echo ""

# Create backup directory
mkdir -p public/screenshots/backup
cp public/screenshots/*.{jpg,png} public/screenshots/backup/

echo "✅ Backup created in public/screenshots/backup/"
echo ""

# AI/ML Projects
echo "🤖 Renaming AI/ML project images..."
mv "public/screenshots/ai-machine.png" "public/screenshots/lenora-ai-ethics-machine.png"
mv "public/screenshots/explorer-robot.png" "public/screenshots/ilanya-cognitive-robot.png"
mv "public/screenshots/astronaut_jellyfish.jpg" "public/screenshots/shandris-cognitive-jellyfish.jpg"

# Physics Projects
echo "⚡ Renaming Physics project images..."
mv "public/screenshots/liquid1.jpg" "public/screenshots/physics-engine-liquid.jpg"
mv "public/screenshots/escape_velocity.jpg" "public/screenshots/collision-detection-escape.jpg"

# Systems Projects
echo "🔧 Renaming Systems project images..."
mv "public/screenshots/cyber.jpg" "public/screenshots/kdemon-cyber-daemon.jpg"
mv "public/screenshots/building_cyber.jpg" "public/screenshots/smartcurl-cyber-building.jpg"
mv "public/screenshots/neon_office.jpg" "public/screenshots/vulnscan-neon-security.jpg"

# Web Projects
echo "🌐 Renaming Web project images..."
mv "public/screenshots/mountain-sunrise.jpg" "public/screenshots/geogo-mountain-data.jpg"
mv "public/screenshots/neon_city.jpg" "public/screenshots/volatria-distributed-city.jpg"
mv "public/screenshots/Fantasy-Landscape3.png" "public/screenshots/artscape-fantasy-art.png"

# Research Papers
echo "📚 Renaming Research paper images..."
mv "public/screenshots/blackwhole.png" "public/screenshots/mathematical-framework-blackhole.png"
mv "public/screenshots/Fantasy-Autumn.png" "public/screenshots/goal-selection-autumn.png"
mv "public/screenshots/glowing-green-dew.jpg" "public/screenshots/cognitive-field-dew.jpg"
mv "public/screenshots/mystical-night-in-town.jpg" "public/screenshots/consciousness-mystical-night.jpg"

# Additional useful images
echo "🌟 Renaming additional useful images..."
mv "public/screenshots/mountain-lake.jpg" "public/screenshots/nature-mountain-lake.jpg"
mv "public/screenshots/liquid2.jpg" "public/screenshots/abstract-liquid-dynamics.jpg"
mv "public/screenshots/neon_car.jpg" "public/screenshots/cyber-neon-car.jpg"
mv "public/screenshots/black-whole.jpg" "public/screenshots/space-black-hole.jpg"
mv "public/screenshots/lion_galaxy_purple.jpg" "public/screenshots/artistic-galaxy-lion.jpg"

echo ""
echo "✅ All screenshots renamed successfully!"
echo ""
echo "📝 Next steps:"
echo "1. Update project data files to reference new image names"
echo "2. Consider compressing large images for web performance"
echo "3. Test the visual impact on your portfolio pages"
echo ""
echo "💡 Original files are backed up in public/screenshots/backup/" 