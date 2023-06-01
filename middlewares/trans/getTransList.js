/**
 * Get transactions of the team and put them on res.locals
 * @param objectRepository
 * @returns {(function(*, *, *))|*}
 */
module.exports = function (objectRepository) {
    return function (req, res, next) {
        objectRepository['transModel'].find({}, null, {sort: {date: -1}}, (err, transactions) => {
            if (err) {
                return next(err);
            }

            res.locals.transList = [];
            const options = {day: "numeric", month: "short", year: "numeric"};

            //team filter
            transactions.forEach(trans => {

                //date formatting
                if (trans.date !== null) {
                    trans.formattedDate = trans.date.toLocaleDateString("en-US", options);
                }

                //check team
                if (trans._userid.toString() === res.locals.user._id.toString()) {
                    trans.username = res.locals.user.name;
                    res.locals.transList.push(trans);
                } else {
                    res.locals.team.forEach(member => {
                        if (trans._userid.toString() === member._id.toString()) {
                            trans.username = member.name;
                            res.locals.transList.push(trans);
                        }
                    });
                }
            });

            return next();
        });
    };
};