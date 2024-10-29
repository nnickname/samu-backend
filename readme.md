# Samu Meetings Backend

## Endpoints

### GET /meeting/:meetingId/chat
Obtiene el historial de una conversación.

### POST /meeting/:meetingId/chat
Envía una pregunta a la conversación.

### GET /meeting/chats
Obtiene todos los chats existentes.

### POST /meeting
Crea una nueva conversación.

## Estructura del Proyecto

```bash
src/
├───config
├───controllers
├───middleware
├───models
├───repositories
├───routes
└───services
```


### `npm start`
- Inicia el app en localhost

### `npm test`
- Inicia los testeos

### `npm ecr:deploy`
- Sube la imagen a AWS ECR

### `npm run build`
- Create production version
