import { MeetingController } from '../controllers/MeetingController';
import express from 'express';

const app = express();
const meetingController = new MeetingController();

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.get('/meeting/:meetingId/chat', meetingController.getChatHistory);
app.post('/meeting/:meetingId/chat', meetingController.askQuestion);
app.post('/meeting/', meetingController.createMeeting); // Nueva ruta para crear reunión
// Exportar el handler para AWS Lambda
export default app;
