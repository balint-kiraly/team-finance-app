/**
 * Get transaction and put on res.locals
 * @param objectRepository
 * @returns {(function(*, *, *))|*}
 */
module.exports = function (objectRepository) {
    return function (req, res, next) {
        objectRepository['transModel'].findOne({_id: req.params.id}, (err, transaction) => {
            if (err || !transaction || transaction._userid.toString() !== req.session.userid) {
                return next(err);
            }

            res.locals.transaction = transaction;

            //date formatting
            if (transaction.date !== null) {
                const options = {day: "numeric", month: "numeric", year: "numeric"};
                res.locals.transaction.formattedDate = res.locals.transaction.date.toLocaleDateString("en-US", options);
            }

            return next();
        });
    };
};