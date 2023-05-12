/**
 * Check form input and user credentials
 *  - if they are ok, set session values and redirect to /dashboard
 *  - if they are wrong, set error message
 * @param objectRepository
 * @returns {(function(*, *, *))|*}
 */
module.exports = function (objectRepository) {
    return function (req, res, next) {
        //not enough parameters
        if (typeof req.body.email === 'undefined' ||
            typeof req.body.password === 'undefined') {

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

            //check pw
            if (req.body.password !== result.password) {
                res.locals.error = "Wrong password"
                return next();
            }

            //login and save id to session
            req.session.userid = result._id;
            return res.redirect('/');
        });
    };
};