const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./app');

//Catching Uncaught Exceptions
process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION!!!!!! SHUTTING DOWN.....');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({path: './config.env'});

const DB = process.env.DATABASE;

//connecting to the database
mongoose
  .connect(DB, {
    useUnifiedTopology:true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() => {
    console.log("DB CONNECTED");
  });

  //Starting the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});

//Catching Unhandled Rejections
process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION!!!!!! SHUTTING DOWN.....');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});


