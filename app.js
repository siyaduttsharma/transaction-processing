const express = require('express');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const transactionRouter = require('./routes/transactionRoute');

const app = express();

// 1) MIDDLEWARE Functions
app.use(express.json());

// 2) ROUTE
app.use('/api/transactions', transactionRouter);


// 3) Error Handling
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  });
  
app.use(globalErrorHandler);

// 4) Exporting
module.exports = app;
