/**
 * Check form input and check if the user does exist
 *  - if they are ok, save user and redirect to /login
 *  - if they are wrong, set error message
 * @param objectRepository
 * @returns {(function(*, *, *))|*}
 */
module.exports = function (objectRepository) {
    return function (req, res, next) {
        //not enough parameters
        if (typeof req.body.name === 'undefined' ||
            typeof req.body.email === 'undefined' ||
            typeof req.body.password === 'undefined') {

            return next();
        }

        //check user exists already
        objectRepository['userModel'].findOne({email: req.body.email}, (err, result) => {
            if (err) {
                return next(err);
            }
            if (result !== null) {
                res.locals.error = "User already exists";
                return next();
            }

            //create user
            const user = new objectRepository['userModel']();
            user.name = req.body.name;
            user.email = req.body.email;
            user.password = req.body.password;

            user.save(err => {
                if (err) {
                    return next(err);
                }
                res.redirect('/login');
            });
        });
    };
};