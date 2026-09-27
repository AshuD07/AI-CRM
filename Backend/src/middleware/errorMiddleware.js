const errorHandler = (err, req, res, next) => {
    res.status(500).json({
        message:" Something went Wrong! Please try again "
    });

}
module.exports = errorHandler;