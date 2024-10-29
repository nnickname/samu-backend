import { MeetingController } from '../controllers/MeetingController';
import express from 'express';

const app = express();
const meetingController = new MeetingController();

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.get('/meeting/:meetingId/chat', meetingController.getChatHistory); // Este obtiene el historial de la conversacion
app.post('/meeting/:meetingId/chat', meetingController.askQuestion); // Este envia una pregunta a la conversacion
app.get('/meeting/chats', meetingController.getAllChats); // Este obtiene todos los chats
app.post('/meeting/', meetingController.createMeeting); // Este crea meeting

// Exportar el handler para AWS Lambda
export default app;
