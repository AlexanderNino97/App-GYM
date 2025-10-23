FROM node:18-alpine

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de configuración
COPY package*.json ./
COPY tsconfig.json ./

# Instalar dependencias
RUN npm ci --only=production

# Copiar código fuente
COPY src/ ./src/

# Construir la aplicación
RUN npm run build

# Exponer puerto
EXPOSE 3001

# Crear usuario no root
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# Cambiar propietario de los archivos
RUN chown -R nodejs:nodejs /app
USER nodejs

# Iniciar la aplicación
CMD ["npm", "start"]