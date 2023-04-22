/**
 * Check form input and user credentials
 *  - if they are ok, set session values and redirect to /dashboard
 *  - if they are wrong, set error message
 * @param objectRepository
 * @returns {(function(*, *, *))|*}
 */
module.exports = function (objectRepository) {
    return function (req, res, next) {
        return next();
    };
};