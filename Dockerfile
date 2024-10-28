FROM public.ecr.aws/lambda/nodejs:18

# Establecer el directorio de trabajo
WORKDIR ${LAMBDA_TASK_ROOT}

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el código fuente
COPY . .

# Compilar TypeScript
RUN npm run build

# Configurar el handler
CMD [ "dist/app.handler" ]
