#!/bin/bash
echo "If anything fails, you can check the star-dev.bash file to follow the instructions and solve errors. / Si algo falla, puedes revisar el archivo start-dev.bash para ver cuál es el problema y solucionarlo."
# --------------------------------------------
# Step 1: Change to the script's directory
# --------------------------------------------
# English: Change directory to where the script is located.
# Spanish: Cambiar al directorio donde se encuentra el script.
script_dir=$(wslpath -a "$(dirname "$0")")
echo "Script directory / Directorio del script: $script_dir"

# --------------------------------------------
# Step 2: Load environment variables from .env file
# --------------------------------------------
# English: Check if the .env file exists and load it. Exit if not found.
# Spanish: Verifica si existe el archivo .env y cárgalo. Sale si no se encuentra.
if [ -f "$script_dir/.env" ]; then
  echo "Loading environment variables from .env file... / Cargando variables de entorno desde .env..."
  export $(grep -v '^#' "$script_dir/.env" | xargs)
else
  echo "ERROR: .env file not found in $script_dir."
  echo "ERROR: Archivo .env no encontrado en $script_dir."
  echo "Please create one using .env.example as a template. / Por favor, cree uno usando .env.example como plantilla."
  exit 1
fi

# --------------------------------------------
# Step 3: Initialize Docker Compose
# --------------------------------------------
# English: Check if a container with 'postgres' in its name is running. If not, start Docker Compose.
# Spanish: Verifica si existe un contenedor con 'postgres' en su nombre. Si no, inicia Docker Compose.
if ! docker ps --format '{{.Names}}' | grep -q 'postgres'; then
  echo "🚀 Starting Docker Compose... / Iniciando Docker Compose..."
  docker-compose -f "$script_dir/docker.compose.yml" up -d
  if [ $? -ne 0 ]; then
    echo "ERROR: Failed to initialize Docker Compose."
    echo "ERROR: Falló la inicialización de Docker Compose."
    exit 1
  fi
else
  echo "✅ PostgreSQL container is already running. / El contenedor de PostgreSQL ya está corriendo."
fi

# --------------------------------------------
# Step 4: Wait until PostgreSQL is ready
# --------------------------------------------
# English: Display the loaded environment variables and wait for PostgreSQL to be ready using pg_isready.
# Spanish: Muestra las variables de entorno cargadas y espera a que PostgreSQL esté listo usando pg_isready.
echo "Environment variables loaded / Variables de entorno cargadas: DB_USER=$DB_USER, DB_NAME=$DB_NAME"
echo "⌛ Waiting for PostgreSQL to be ready... / Esperando a que PostgreSQL esté listo..."
until docker-compose -f "$script_dir/docker.compose.yml" exec postgres pg_isready -U "$DB_USER" -d "$DB_NAME"; do
  echo "Waiting for PostgreSQL... / Esperando a que PostgreSQL esté listo..."
  sleep 2
done

echo "✅ PostgreSQL is ready. Starting the server... / PostgreSQL listo. Iniciando el servidor..."

# --------------------------------------------
# Step 5: Start the server
# --------------------------------------------
# English: Start the server using concurrently.
# Spanish: Inicia el servidor usando concurrently.
npx concurrently "nodemon --exec tsx ./src/Index.ts"


# If you see an error about the .env file not being found:
# Make sure that a .env file exists in the same directory as this script. You can create one by
# copying .env.example and renaming it to .env.
# Asegúrate de que exista un archivo .env en el mismo directorio que este script. Puedes crearlo copiando .env.example y renombrándolo a .env.

# If Docker Compose fails to initialize:
# Verify that Docker is installed, running, and integrated with your WSL distro. Check Docker Desktop settings for WSL integration.
# Verifica que Docker esté instalado, corriendo y que esté integrado con tu distribución WSL. Revisa la configuración de Docker Desktop para la integración con WSL.

# If PostgreSQL is not ready:
# Check the logs of the PostgreSQL container to see if there are any errors. Ensure that the database credentials in your .env file match those in your docker.compose.yml configuration.
# Revisa los logs del contenedor de PostgreSQL para ver si hay errores. Asegúrate de que las credenciales de la base de datos en tu en tu archivo .env coincidan con las configuradas en docker.compose.yml.
