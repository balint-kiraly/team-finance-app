/**
 * Get transaction and put on res.locals
 * @param objectRepository
 * @returns {(function(*, *, *))|*}
 */
module.exports = function (objectRepository) {
    return function (req, res, next) {
        objectRepository['transModel'].findOne({_id: req.params.id}, (err, transaction) => {
            if (err || !transaction) {
                return next(err);
            }

            res.locals.transaction = transaction;
            return next();
        });
    };
};