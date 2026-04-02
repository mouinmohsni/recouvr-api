const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRoutes =require('./routes/authRoutes');
const setupSwagger = require('./config/swagger');

const app = express();



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/api/auth",authRoutes)


setupSwagger(app);

// Gestion des erreurs 404 (JSON)
app.use((req, res, next) => {
  res.status(404).json({ message: "Ressource non trouvée" });
});

// Gestionnaire d'erreurs global (JSON)
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

module.exports = app;
