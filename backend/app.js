require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const routes = require('./routes/routes');
const errorsHandler = require('./middlewares/errorsHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

mongoose.connect('mongodb://localhost:27017/mestodb');

const app = express();

console.log(process.env.NODE_ENV);

const { PORT = 3000 } = process.env;

app.use(cors({ credentials: true, origin: ['http://romanf89.nomorepartiesco.ru', 'http://api.romanf89.nomorepartiesco.ru', 'https://romanf89.nomorepartiesco.ru', 'https://api.romanf89.nomorepartiesco.ru', 'https://localhost:3001', 'https://localhost:3000', 'http://localhost:3001', 'http://localhost:3000'] }));

app.use(helmet());

app.use(express.json());

app.use(cookieParser());

app.listen(PORT, () => {
  console.log('server has been started');
});

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(routes);

app.use(errorLogger);

app.use(errors());

app.use(errorsHandler);
