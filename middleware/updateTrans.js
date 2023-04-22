/**
 * Create (or update) transaction if we have the data for it
 * update if we have a res.local.trans, create if we don't have
 *  - if there is not enough input, set error message
 *  - if everything is ok redirect to /transactions
 * @param objectRepository
 * @returns {(function(*, *, *))|*}
 */
module.exports = function (objectRepository) {
    return function (req, res, next) {
        return next();
    };
};