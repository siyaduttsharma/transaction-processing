const Transaction = require("./../models/transactionsModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

 //Get a daily report
exports.getDailyReport = catchAsync(async (req, res, next) => {
    const year = req.params.year * 1; 
    const month = req.params.month * 1;
    const day = req.params.day * 1;
    const nextDay = day + 1;

    const dailyBalance = await Transaction.aggregate([
        {
        $match: {
            time: {
              $gte: new Date(`${year}-${month}-${day}`),
              $lte: new Date(`${year}-${month}-${nextDay}`),
            },
          },
      },

      {
        $group: {
          _id: null,
          dailyBalance: {$sum: '$amount'}
        },
      },

      {
        $project: {
              dailyBalance: true,
              _id: false,
        },
      },
    ]);

    if(dailyBalance.length === 0){
        return next(new AppError('No balance found for this day', 404));
      };

    res.status(200).json({
      status: 'success',
      message: `Showing balance for: ${day}.${month}.${year}`,
      dailyBalance
    });
 });

 //Get a weekly report
exports.getWeeklyReport = catchAsync(async (req, res, next) => {
    const year = req.params.year * 1; 
    const month = req.params.month * 1;
    const day = req.params.day * 1;
    const nextWeek = day + 7;

    const weeklyBalance = await Transaction.aggregate([
      {
        $match: {
            time: {
              $gte: new Date(`${year}-${month}-${day}`),
              $lte: new Date(`${year}-${month}-${nextWeek}`),
            },
          },
      },

      {
        $group: {
          _id: null,
          weeklyBalance: {$sum: '$amount'}
        },
      },

      {
        $project: {
              weeklyBalance: true,
              _id: false,
        },
      },
    ]);

    if(weeklyBalance.length === 0){
        return next(new AppError('No balance found for this week', 404));
      };

    res.status(200).json({
      status: 'success',
      message: `Showing balance for the week of: (${day} - ${nextWeek}).${month}.${year}`,
      weeklyBalance
    });
 });

 //Get a monthly report
exports.getMonthlyReport = catchAsync(async (req, res, next) => {
    const year = req.params.year * 1; 
    const month = req.params.month * 1;

    const monthlyBalance = await Transaction.aggregate([
        {
        $match: {
            time: {
              $gte: new Date(`${year}-${month}-01`),
              $lte: new Date(`${year}-${month}-31`),
            },
          },
      },

      {
        $group: {
          _id: null,
          monthlyBalance: {$sum: '$amount'}
        },
      },

      {
        $project: {
            monthlyBalance: true,
              _id: false,
        },
      },
    ]);

    if(monthlyBalance.length === 0){
        return next(new AppError('No balance found for this month', 404));
      };

    res.status(200).json({
      status: 'success',
      message: `Showing balance for: ${month}.${year}`,
      monthlyBalance
    });
 });

 //Get a yearly report
exports.getYearlyReport = catchAsync(async (req, res, next) => {
    const year = req.params.year * 1; 

    const yearlyBalance = await Transaction.aggregate([
      {
        $match: {
            time: {
              $gte: new Date(`${year}-01-01`),
              $lte: new Date(`${year}-12-31`),
            },
          },
      },

      {
        $group: {
          _id: null,
          yearlyBalance: {$sum: '$amount'}
        },
      },

      {
        $project: {
            yearlyBalance: true,
            _id: false,
        },
      },
    ]);

    if(yearlyBalance.length === 0){
        return next(new AppError('No balance found for this year', 404));
      };

    res.status(200).json({
      status: 'success',
      message: `Showing balance for the year: ${year}`,
      yearlyBalance
      
    });
 });






   