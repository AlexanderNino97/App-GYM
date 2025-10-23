import app from './app';
import { MySQLConnection } from './infrastructure/database/MySQLConnection';

const PORT = process.env.PORT || 3001;

async function startServer() {
  try {
    // Iniciar servidor
    const server = app.listen(PORT, () => {
      console.log(`User Service corriendo en puerto ${PORT}`);
      console.log(`Health check: http://localhost:${PORT}/health`);
      console.log(`Documentación: http://localhost:${PORT}/`);
    });

    // Manejo de cierre gracioso
    const gracefulShutdown = async (signal: string) => {
      console.log(`\nRecibida señal ${signal}. Cerrando servidor...`);
      
      server.close(async () => {
        console.log('Servidor HTTP cerrado');
        
        // Cerrar conexión a base de datos
        const db = MySQLConnection.getInstance();
        await db.disconnect();
        
        console.log('Conexión a base de datos cerrada');
        console.log('Aplicación cerrada exitosamente');
        process.exit(0);
      });

      // Forzar cierre después de 10 segundos
      setTimeout(() => {
        console.error('Forzando cierre de la aplicación');
        process.exit(1);
      }, 10000);
    };

    // Escuchar señales del sistema
    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));

    // Manejo de errores no capturados
    process.on('uncaughtException', (error) => {
      console.error('Error no capturado:', error);
      gracefulShutdown('uncaughtException');
    });

    process.on('unhandledRejection', (reason, promise) => {
      console.error('Promesa rechazada no manejada:', reason);
      console.error('Promise:', promise);
      gracefulShutdown('unhandledRejection');
    });

  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
    process.exit(1);
  }
}

// Iniciar la aplicación
startServer();