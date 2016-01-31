#!/bin/bash

# Usage: ./setup.sh $relativeOrAbsolutePathToHarakaInstallDirectory

echo "Setting up: haraka-telegram-forward:"
echo ""
echo "Copying telegram-forwarder config to $1/config/telegram.forwarder.ini..."
echo ""

cp -R config/telegram.forwarder.ini $1/config

echo "Copying telegram-forwarder documentation to $1/docs/plugins/telegram.forwarder.md..."
echo ""

cp -R docs/plugins/telegram.forwarder.md $1/docs/plugins

echo "Copying telegram-forwarder plugin implementation to $1/plugins/telegram.forwarder.js..."
echo ""

cp -R plugins/telegram.forwarder.js $1/plugins
echo "Done."

sh start.sh $1