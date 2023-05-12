/**
 * Check form input and new member team assignment
 *  - if they are ok, check if user is assigned to a team
 *                      - if true add teamid to the new member
 *                      - if not generate teamid, and add for both the user and the new member
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

        //check user exists
        objectRepository['userModel'].findOne({email: req.body.email}, (err, result) => {
            if (err) {
                return next(err);
            }
            if (result === null) {
                res.locals.error = "No such user"
                return next();
            }
            if (result === res.locals.user) {
                res.locals.error = "You can't add yourself"
                return next();
            }

            //check team
            if (typeof result._teamid !== 'undefined') {
                res.locals.error = "User is assigned to other team"
                return next();
            }

            //add member

            if (typeof res.locals.user._teamid === 'undefined') {
                //create new team
                res.locals.user._teamid = new objectRepository['teamModel']();
                res.locals.user._teamid.save(err => {
                    if (err) {
                        return next(err);
                    }

                    res.locals.user.save(err => {
                        if (err) {
                            return next(err);
                        }

                        result._teamid = res.locals.user._teamid;
                        result.save(err => {
                            if (err) {
                                return next(err);
                            }

                            return res.redirect('/team');
                        });
                    });
                });
            } else {

                result._teamid = res.locals.user._teamid;
                res.locals.user.save(err => {
                    if (err) {
                        return next(err);
                    }

                    result.save(err => {
                        if (err) {
                            return next(err);
                        }

                        return res.redirect('/team');
                    });
                });
            }
        });
    };
};