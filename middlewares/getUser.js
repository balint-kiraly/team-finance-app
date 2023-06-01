/***
 * Get user data from database
 * @param objectRepository
 * @returns {(function(*, *, *): void)|*}
 */
module.exports = function (objectRepository) {
    return function (req, res, next) {
        objectRepository['userModel'].findOne({_id: req.session.userid}, (err, user) => {
            if (err) {
                return next(err);
            }
            res.locals.user = user;
            return next();
        });
    };
};