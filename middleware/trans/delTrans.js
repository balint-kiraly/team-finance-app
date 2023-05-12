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
        const trans = res.locals.transaction;
        res.locals.transaction.remove((err) => {
            if (err) {
                return next(err);
            }

            //update balance
            if (trans.category === 'Income') {
                res.locals.user.balance -= trans.value;
            } else {
                res.locals.user.balance += trans.value;
            }

            res.locals.user.save(err => {
                if (err) {
                    return next(err);
                }

                return res.redirect('/transactions');
            });
        })
    };
};