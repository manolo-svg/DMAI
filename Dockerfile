# Backend - Node.js Server
FROM node:20-alpine

WORKDIR /app

# Copiar package.json del servidor
COPY package.json package-lock.json* ./

# Instalar dependencias
RUN npm install

# Copiar el código del servidor
COPY server ./server

# Exponer puerto 3000
EXPOSE 3000

# Comando para iniciar el servidor
CMD ["npm", "run", "start"]
