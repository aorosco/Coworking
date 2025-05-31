#!/bin/sh

echo "Esperando a que PostgreSQL esté listo..."
while ! nc -z db 5432; do
  sleep 1
done

echo "PostgreSQL está listo"
echo "Ejecutando migraciones..."
npx sequelize-cli db:migrate

echo "Iniciando la aplicación..."
npm run dev 