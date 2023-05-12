/**
 * Remove teamid of member
 * @param objectRepository
 * @returns {(function(*, *, *))|*}
 */
module.exports = function (objectRepository) {
    return function (req, res, next) {
        if (typeof res.locals.member === 'undefined') {
            return next();
        }

        res.locals.member._teamid = undefined;
        res.locals.member.save();

        return next();
    };
};