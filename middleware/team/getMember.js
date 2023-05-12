/**
 * Get member and put on res.locals
 * @param objectRepository
 * @returns {(function(*, *, *))|*}
 */
module.exports = function (objectRepository) {
    return function (req, res, next) {
        objectRepository['userModel'].findOne({_id: req.params.userid}, (err, member) => {
            if (err || !member) {
                return next(err);
            }

            res.locals.member = member;
            return next();
        });
    };
};