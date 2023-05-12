/**
 * Remove session values
 * @param objectRepository
 * @returns {(function(*, *, *))|*}
 */
module.exports = function (objectRepository) {
    return function (req, res, next) {
        req.session.destroy((err) => {
            res.redirect('/');
        });
    };
};