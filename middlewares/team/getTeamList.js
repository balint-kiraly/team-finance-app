/**
 * Get the team members of the user and put them on res.locals
 * @param objectRepository
 * @returns {(function(*, *, *))|*}
 */
module.exports = function (objectRepository) {
    return function (req, res, next) {
        if (typeof res.locals.user._teamid === 'undefined') {
            res.locals.team = [];
            return next();
        }
        objectRepository['userModel'].find({_teamid: res.locals.user._teamid}, (err, members) => {
            if (err) {
                return next(err);
            }

            res.locals.team = members;
            return next();
        });
    };
};