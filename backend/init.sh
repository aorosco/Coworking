#!/bin/sh

# Esperar a que la base de datos esté lista
echo "Esperando a que la base de datos esté lista..."
sleep 10

# Ejecutar migraciones
echo "Ejecutando migraciones..."
npx sequelize-cli db:migrate

# Iniciar la aplicación
echo "Iniciando la aplicación..."
npm run dev 