#!/bin/bash

if ! docker ps --format '{{.Names}}' | grep -q '^postgres$'; then
  echo "🚀 Initializing Docker Compose..."
  docker-compose -f docker.compose.yml up -d
else
  echo "✅ PostgreSQL currently running."
fi
