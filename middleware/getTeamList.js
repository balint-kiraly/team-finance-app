/**
 * Get the team members of the user and put them on res.locals
 * @param objectRepository
 * @returns {(function(*, *, *))|*}
 */
module.exports = function (objectRepository) {
    return function (req, res, next) {

        res.locals.teamList = [
            {
                _id: "$id",
                name: "$name",
                email: "$email",
                password: "$password"
            }
        ];

        return next();
    };
};