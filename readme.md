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
ai-chatbot/
├── src/
│   ├── handlers/
│   │   └── chat.ts
│   ├── services/
│   │   ├── openai.ts
│   │   └── mongodb.ts
│   ├── models/
│   │   └── conversation.ts
│   ├── types/
│   │   └── index.ts
│   └── config/
│       └── config.ts
├── package.json
├── tsconfig.json
└── serverless.yml
```


### `npm start`
- Inicia el app en localhost

### `npm test`
- Inicia los testeos

### `npm ecr:deploy`
- Sube la imagen a AWS ECR

### `npm run build`
- Create production version
