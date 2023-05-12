/**
 * Remove transaction
 * @param objectRepository
 * @returns {(function(*, *, *))|*}
 */
module.exports = function (objectRepository) {
    return function (req, res, next) {
        if (typeof res.locals.transaction === 'undefined') {

            return next();
        }
        res.locals.transaction.remove((err) => {
            if (err) {
                return next(err);
            }

            return res.redirect('/transactions');
        })
    };
};