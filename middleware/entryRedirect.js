/**
 * Check if the user is signed in
 * - redirect to /dashboard if the user is signed in
 * - redirect to /login if not
 * @param objectRepository
 * @returns {(function(*, *, *))|*}
 */
module.exports = function (objectRepository) {
    return function (req, res, next) {
        if (typeof req.session.userid === 'undefined') {
            return res.redirect('/login');
        } else {
            return res.redirect('/dashboard');
        }
    };
};