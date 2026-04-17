require('dotenv').config();

const APP_CONFIG = {
  port: process.env.PORT || 8000,
  environment: process.env.NODE_ENV || 'development',
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    headers: ['Content-Type', 'Authorization']
  }
};

module.exports = APP_CONFIG;
