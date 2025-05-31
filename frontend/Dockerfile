# Dockerfile para frontend (React)
FROM node:18.17.1-alpine3.18

# Configurar npm para usar un registro más confiable
RUN npm config set registry https://registry.npmjs.org/

WORKDIR /app

# Copiar los archivos de dependencias
COPY package*.json ./

# Instalar dependencias con configuración adicional
RUN npm install --legacy-peer-deps

# Copiar el resto de los archivos
COPY . .

# Exponer el puerto
EXPOSE 3000

ENV VITE_API_URL=http://localhost:5000/api/v1

# Agregar healthcheck
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost:3000 || exit 1

CMD ["npm", "run", "dev"] 