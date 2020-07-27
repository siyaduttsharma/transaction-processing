const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Transaction = require('./models/transactionsModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    useUnifiedTopology:true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log('DB connection successful!'));

// READING THE JSON FILE
const transactions = JSON.parse(
  fs.readFileSync(`${__dirname}/transaction-data.json`, 'utf-8')
);

// IMPORTING DATA INTO THE DATABASE
const importData = async () => {
  try {
    await Transaction.create(transactions);
    console.log('Data successfully loaded!');
  } catch (err) {
    console.log('Error loading the database!!');
  }
  process.exit();
};

// DELETING ALL DATA FROM THE DATABASE
const deleteData = async () => {
  try {
    await Transaction.deleteMany();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log('Error deleting the database!!');
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
