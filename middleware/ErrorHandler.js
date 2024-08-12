const AppError = require('../utils/AppError');

exports.DeveloperError = (err, res) => {
    res.status(500).json({
        error: err,
        status: err.statusCode,
        message: err.message
    });
};

exports.errorHandler = (req, res, err = AppError, next) => {
    DeveloperError(err, res);
};