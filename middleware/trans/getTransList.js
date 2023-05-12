/**
 * Get transactions of the team and put them on res.locals
 * @param objectRepository
 * @returns {(function(*, *, *))|*}
 */
module.exports = function (objectRepository) {
    return function (req, res, next) {
        objectRepository['transModel'].find({}, (err, transactions) => {
            if (err) {
                return next(err);
            }
            //TODO:team filter
            res.locals.transList = transactions;
            return next();
        });
    };
};