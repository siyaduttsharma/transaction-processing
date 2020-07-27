const express = require('express');

const reportController = require('./../controllers/reportController');
const transactionController = require('./../controllers/transactionController');

const router = express.Router();

//Transaction related routes
router
  .route('/transaction-stats')
  .get(transactionController.getTranStats);

router
  .route('/credits')
  .get(transactionController.getCreditData);

router
  .route('/debits')
  .get(transactionController.getDebitData);

router
  .route('/')
  .get(transactionController.getAllTransactions)
  .post(transactionController.createTransaction);

router
  .route('/:id')
  .get(transactionController.getTransactions)
  .patch(transactionController.updateTransaction)
  .delete(transactionController.deleteTransaction);

//Account Reports
router
  .route('/dailyReport/:year/:month/:day')
  .get(reportController.getDailyReport);

router
  .route('/weeklyReport/:year/:month/:day')
  .get(reportController.getWeeklyReport);

router
  .route('/monthlyReport/:year/:month')
  .get(reportController.getMonthlyReport);

router
  .route('/yearlyReport/:year')
  .get(reportController.getYearlyReport);

module.exports = router;


