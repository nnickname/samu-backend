import express from 'express';
import meetingRoutes from './routes/meeting.routes';

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use('/meeting', meetingRoutes);

// Manejo de errores global
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({
    message: 'Internal Server Error',
    error: err.message
  });
});

export default app;
