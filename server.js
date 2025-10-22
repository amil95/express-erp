import app from './app.js';
import { testConnection } from './src/config/db.js';

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await testConnection(); // ensure DB is connected before listening
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server due to DB connection error', err);
    process.exit(1);
  }
};

startServer();
