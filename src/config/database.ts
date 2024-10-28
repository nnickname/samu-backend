import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';

// Cargar las variables de entorno al inicio
dotenv.config();

export const connectDB = async (): Promise<void> => {
  try {
    // Agregar más logging para debug
    console.log('Intentando conectar a MongoDB...');
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/meeting-chat', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    } as ConnectOptions);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};
