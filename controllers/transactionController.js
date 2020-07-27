const Transaction = require('./../models/transactionsModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getAllTransactions =  catchAsync(async (req, res, next) => {
    // Queries
    const features = new APIFeatures(Transaction.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const transactions = await features.query;

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: transactions.length,
      data: {
        transactions
      }
    });
});

exports.getTransactions = catchAsync(async (req, res, next) => {
    const transaction = await Transaction.findById(req.params.id);

    if(!transaction){
      return next(new AppError('No transaction found with that ID', 404));
    };

    res.status(200).json({
      status: 'success',
      data: {
        transaction
      }
    });
});

exports.createTransaction = catchAsync(async (req, res, next) => {
  const newTransaction = await Transaction.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      transaction: newTransaction
    }
  });
});

exports.updateTransaction = catchAsync(async (req, res, next) => {
    const transaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if(!transaction){
      return next(new AppError('No transaction found with that ID', 404));
    };

    res.status(200).json({
      status: 'success',
      data: {
        transaction
      }
    });
});

exports.deleteTransaction = catchAsync(async (req, res, next) => {
    const transaction = await Transaction.findByIdAndDelete(req.params.id);

    if(!transaction){
      return next(new AppError('No transaction found with that ID', 404));
    };

    res.status(204).json({
      status: 'success',
      data: null
    });
});

//gets transaction statistics by category
exports.getTranStats = catchAsync(async (req, res, next) => {
    const stats = await Transaction.aggregate([
      {
        $group: {
          _id: { $toUpper: '$category' },
          numTransactions: { $sum: 1 },
          totalIncomeOrExpense: { $sum: '$amount' },
          minSpending_InOneTransaction: { $min: '$amount' },
          maxSpending_InOneTransaction: { $max: '$amount' }
        }
      },
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        stats
      }
    });
});

//gets the statistics for credit transactions
exports.getCreditData = catchAsync(async (req, res, next) => {
  const stats = await Transaction.aggregate([
      {
        $match: { amount: { $gt: 0 } }
      },

      {
        $group: {
          _id: { $toUpper: '$category' },
          numTransactions: { $sum: 1 },
          totalEarnings: {$sum: '$amount'},
          minCredit_InOneTransaction: { $min: '$amount' },
          maxCredit_InOneTransaction: { $max: '$amount' }
        }
      },
    ]);

      res.status(200).json({
        status: 'success',
        data: {
          stats
        }
      });
  });

//gets the statistics for debit transactions
  exports.getDebitData = catchAsync(async (req, res, next) => {
    const stats = await Transaction.aggregate([
        {
          $match: { amount: { $lt: 0 } }
        },
  
        {
          $group: {
            _id: { $toUpper: '$category' },
            numTransactions: { $sum: 1 },
            totalExpenditure: {$sum: '$amount'},
            minDebit_InOneTransaction: { $max: '$amount' },
            maxDebit_InOneTransaction: { $min: '$amount' },
          }
        },
      ]);
  
        res.status(200).json({
          status: 'success',
          data: {
            stats
          }
        });
    });

