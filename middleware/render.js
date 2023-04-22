/**
 * Using the template engine render the values into the template
 * @param objectRepository
 * @param viewName
 * @returns {(function(*, *))|*}
 */
module.exports = function (objectRepository, viewName) {
    return function (req, res) {
        res.render(viewName, res.locals);
    };
};