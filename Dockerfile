# Etapa de construcción
FROM node:20 as builder
WORKDIR /app
COPY package*.json ./       
COPY tsconfig.json ./        
COPY src/ ./src/            
RUN npm ci           
RUN npm run build
    
# Etapa de producción
FROM node:20
WORKDIR /app
COPY package*.json ./        
RUN npm ci --production   
COPY --from=builder /app/build/ ./build/ 

# Exponemos el puerto que usará la aplicación
EXPOSE 3000

# Cambiamos el comando para iniciar la aplicación
CMD ["node", "build/app.js" ]
