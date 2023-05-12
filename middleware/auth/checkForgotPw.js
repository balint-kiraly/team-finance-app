/**
 * Check form input and if email exists
 *  - if they are ok, send password to console.log
 *  - if they are wrong, set error message
 * @param objectRepository
 * @returns {(function(*, *, *))|*}
 */
module.exports = function (objectRepository) {
    return function (req, res, next) {
        //not enough parameters
        if (typeof req.body.email === 'undefined') {

            return next();
        }

        //check registered
        objectRepository['userModel'].findOne({email: req.body.email}, (err, result) => {
            if (err) {
                return next(err);
            }
            if (result === null) {
                res.locals.error = "Email is not registered"
                return next();
            }

            console.log(`Your Password: ${result.password}`);
            
        });
    };
};