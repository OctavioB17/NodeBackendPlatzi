#!/bin/bash

CONFIG_DIR="./pgadmin-data"
FILE_PATH="$CONFIG_DIR/servers.json"

mkdir -p "$CONFIG_DIR"

cat > "$FILE_PATH" <<EOF
{
  "Servers": {
    "1": {
      "Name": "PostgreSQL",
      "Group": "Servers",
      "Host": "${DB_HOST}",
      "Port": ${DB_PORT},
      "Username": "${DB_USER}",
      "Password": "${DB_PASSWORD}",
      "SSLMode": "prefer",
      "MaintenanceDB": "${DB_NAME}"
    }
  }
}
EOF

echo "✅ Archivo servers.json generado correctamente en $FILE_PATH / servers.json generated in $FILE_PATH"