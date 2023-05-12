const entryRedirectMW = require('../middleware/entryRedirect');
const authMW = require('../middleware/auth');
const getTransListMW = require('../middleware/getTransList');
const getTeamListMW = require('../middleware/getTeamList');
const renderMW = require('..//middleware/render');
const inverseAuthMW = require('../middleware/inverseAuth');
const checkLoginMW = require('../middleware/checkLogin');
const checkForgotPwMW = require('../middleware/checkForgotPw');
const checkRegisterMW = require('../middleware/checkRegistration');
const logoutMW = require('../middleware/logout');

const userModel = require('../models/user');
const transModel = require('../models/transaction');

module.exports = function (app) {
    const objectRepository = {
        userModel,
        transModel
    };

    app.get('/dashboard',
        authMW(objectRepository),
        getTransListMW(objectRepository),
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
        renderMW(objectRepository, 'registration')
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