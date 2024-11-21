# Usar una imagen base de Node.js
FROM node:14-alpine

# Crear y establecer el directorio de trabajo principal
WORKDIR /app

# Copiar package.json y package-lock.json (si existe)
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto del código de la aplicación al contenedor
COPY app /app

# Exponer el puerto en el que la aplicación escuchará
EXPOSE 3500

# Instalar nodemon globalmente (si no está en package.json)
RUN npm install -g nodemon

# Comando para ejecutar la aplicación
CMD ["nodemon", "server.js"]
