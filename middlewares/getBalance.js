/**
 * Get the user account balance
 * @param objectRepository
 * @returns {(function(*, *, *))|*}
 */
module.exports = function (objectRepository) {
    return function (req, res, next) {
        let income = 0;
        let outcome = 0;
        res.locals.transList.forEach((trans) => {
            if (trans.category === 'Income') {
                income += trans.value;
            } else {
                outcome -= trans.value;
            }
        });
        res.locals.balance = {income: income, outcome: outcome};
        return next();
    };
};