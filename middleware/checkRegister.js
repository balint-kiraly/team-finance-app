/**
 * Check form input and check if the user does not exist
 *  - if they are ok, save user and redirect to /login
 *  - if they are wrong, set error message
 * @param objectRepository
 * @returns {(function(*, *, *))|*}
 */
module.exports = function (objectRepository) {
    return function (req, res, next) {
        return next();
    };
};