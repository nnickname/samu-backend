import express from 'express';
import cors from 'cors';
import meetingRoutes from './routes/meeting.routes';

const app = express();

// Configuración de CORS - debe ir ANTES de las rutas
app.use(cors({
  origin: '*', // Especifica el origen exacto
  credentials: true, // Permite credenciales
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'] // Headers permitidos
}));

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use('/api', meetingRoutes);

// Manejo de errores global
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({
    message: 'Internal Server Error',
    error: err.message
  });
});

export default app;
