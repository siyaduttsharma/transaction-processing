const mongoose = require('mongoose');

//Defining the schema
const transactionSchema = new mongoose.Schema({

    transactionId: {
      type: Number,
      required: [true, 'A transaction must have an id!'],
      unique: true
    },

    sourceAccount: {
      type: Number,
      required: [true, 'A transaction must have a source account!'],
    },

    targetAccount: {
      type: Number,
      required: [true, 'A transaction must have a target account number!'],
    },

    amount: {
      type: Number,
      required: true,
    },

    category: {
        type: String,
        required: [true, 'A category must be provided!'],
        enum: {
          values: ['eating_out','salary', 'groceries', 'other']
        }
    },

    time: {
      type: Date,
      required: true,
    },
 });

//Model
const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
