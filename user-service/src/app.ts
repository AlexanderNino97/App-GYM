import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { errorHandler } from './infrastructure/middleware/errorHandler';
import userRoutes from './infrastructure/routes/userRoutes';

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'));

// Rutas
app.use('/api/users', userRoutes);

// Ruta de health check
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'user-service',
    version: '1.0.0'
  });
});

// Ruta raíz
app.get('/', (req, res) => {
  res.json({
    message: 'User Service - Gym Management System',
    version: '1.0.0',
    endpoints: {
      register: 'POST /api/users/register',
      login: 'POST /api/users/login',
      profile: 'GET /api/users/profile',
      logout: 'POST /api/users/logout'
    }
  });
});

// Middleware de manejo de errores (debe ir después de las rutas)
app.use(errorHandler);

// Manejo de rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Ruta no encontrada'
  });
});

export default app;