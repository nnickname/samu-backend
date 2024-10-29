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

# Permitir que Render establezca el puerto
EXPOSE ${PORT}

# Modificar el comando para usar la variable de entorno PORT
CMD ["sh", "-c", "node build/app.js"]
