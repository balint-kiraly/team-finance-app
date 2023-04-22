const entryRedirectMW = require('../middleware/entryRedirect');
const authMW = require('../middleware/auth');
const getRecentTransListMW = require('../middleware/getRecentTransList');
const getTeamListMW = require('../middleware/getTeamList');
const renderMW = require('..//middleware/render');
const inverseAuthMW = require('../middleware/inverseAuth');
const checkLoginMW = require('../middleware/checkLogin');
const checkForgotPwMW = require('../middleware/checkForgotPw');
const checkRegisterMW = require('../middleware/checkRegister');
const logoutMW = require('../middleware/logout');

module.exports = function (app) {
    const objectRepository = {};

    app.get('/dashboard',
        authMW(objectRepository),
        getRecentTransListMW(objectRepository),
        getTeamListMW(objectRepository),
        renderMW(objectRepository, 'dashboard')
    );

    app.use('/login',
        inverseAuthMW(objectRepository),
        checkLoginMW(objectRepository),
        renderMW(objectRepository, 'login')
    );

    app.use('/forgotpw',
        inverseAuthMW(objectRepository),
        checkForgotPwMW(objectRepository),
        renderMW(objectRepository, 'forgotpw')
    );

    app.use('/register',
        inverseAuthMW(objectRepository),
        checkRegisterMW(objectRepository),
        renderMW(objectRepository, 'register')
    );

    app.get('/logout',
        authMW(objectRepository),
        logoutMW(objectRepository),
        function (req, res, next) {
            return res.redirect('/login')
        }
    );

    app.get('/',
        entryRedirectMW(objectRepository)
    );
};