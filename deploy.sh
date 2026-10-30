#!/bin/bash
set -e

APP_DIR="/var/www/portfolio"

echo "Navigating to repository..."
cd "$APP_DIR"

echo "Pulling latest changes from main branch..."
git pull origin main

echo "Updating file permissions..."
chown -R www-data:www-data "$APP_DIR"
chmod -R 755 "$APP_DIR"

echo "Testing Nginx configuration..."
nginx -t

echo "Reloading Nginx service..."
systemctl reload nginx

echo "Portfolio deployed successfully."
