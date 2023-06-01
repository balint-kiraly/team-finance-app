const entryRedirectMW = require('../middlewares/auth/entryRedirect');
const authMW = require('../middlewares/auth/auth');
const getUserMW = require('../middlewares/getUser');
const getBalanceMW = require('../middlewares/getBalance');
const getTransListMW = require('../middlewares/trans/getTransList');
const getTeamListMW = require('../middlewares/team/getTeamList');
const renderMW = require('../middlewares/render');
const inverseAuthMW = require('../middlewares/auth/inverseAuth');
const checkLoginMW = require('../middlewares/auth/checkLogin');
const checkForgotPwMW = require('../middlewares/auth/checkForgotPw');
const checkRegisterMW = require('../middlewares/auth/checkRegistration');
const logoutMW = require('../middlewares/auth/logout');

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