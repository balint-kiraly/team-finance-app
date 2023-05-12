/**
 * Create (or update) transaction if we have the data for it
 * update if we have a res.locals.trans, create one if we don't have
 *  - if there is not enough input, set error message
 *  - if everything is ok redirect to /transactions
 * @param objectRepository
 * @returns {(function(*, *, *))|*}
 */
module.exports = function (objectRepository) {
    return function (req, res, next) {
        if (typeof req.body.name === 'undefined' ||
            typeof req.body.category === 'undefined' ||
            typeof req.body.date === 'undefined' ||
            typeof req.body.value === 'undefined') {

            return next();
        }

        if (typeof res.locals.transaction === 'undefined') {
            res.locals.transaction = new objectRepository['transModel']();
        }

        //TODO:(empty strings?), input handling

        res.locals.transaction.name = req.body.name;
        res.locals.transaction.category = req.body.category;
        res.locals.transaction.date = req.body.date;
        res.locals.transaction.value = req.body.value;
        //TODO:save userid

        res.locals.transaction.save(err => {
            if (err) {
                return next(err);
            }

            return res.redirect('/transactions');
        });
    };
};