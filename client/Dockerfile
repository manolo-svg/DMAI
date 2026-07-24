# Frontend - React with Vite
FROM node:20-alpine

WORKDIR /app

# Copiar package.json del cliente
COPY package.json package-lock.json* ./

# Instalar dependencias
RUN npm install

# Copiar el código del cliente
COPY . .

# Exponer puerto 5173
EXPOSE 5173

# Comando para iniciar el servidor de desarrollo
CMD ["npm", "run", "dev"]
