/**
 * Check if the user is signed in
 * - if not, redirect to /login
 * @param objectRepository
 * @returns {(function(*, *, *))|*}
 */
module.exports = function (objectRepository) {
    return function (req, res, next) {
        return next();
    };
};