const entryRedirectMW = require('../middleware/auth/entryRedirect');
const authMW = require('../middleware/auth/auth');
const getUserMW = require('../middleware/getUser');
const getBalanceMW = require('../middleware/getBalance');
const getTransListMW = require('../middleware/trans/getTransList');
const getTeamListMW = require('../middleware/team/getTeamList');
const renderMW = require('..//middleware/render');
const inverseAuthMW = require('../middleware/auth/inverseAuth');
const checkLoginMW = require('../middleware/auth/checkLogin');
const checkForgotPwMW = require('../middleware/auth/checkForgotPw');
const checkRegisterMW = require('../middleware/auth/checkRegistration');
const logoutMW = require('../middleware/auth/logout');

const userModel = require('../models/user');
const transModel = require('../models/transaction');
const teamModel = require('../models/team');

module.exports = function (app) {
    const objectRepository = {
        userModel,
        transModel,
        teamModel
    };

    app.get('/dashboard',
        authMW(objectRepository),
        getUserMW(objectRepository),
        getTeamListMW(objectRepository),
        getTransListMW(objectRepository),
        getTeamListMW(objectRepository),
        getBalanceMW(objectRepository),
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