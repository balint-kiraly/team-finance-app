const authMW = require('../middlewares/auth/auth');
const getUserMW = require("../middlewares/getUser");
const renderMW = require('../middlewares/render');
const getTeamListMW = require('../middlewares/team/getTeamList');
const getTransListMW = require('../middlewares/trans/getTransList');
const getTransMW = require('../middlewares/trans/getTrans');
const saveTransMW = require('../middlewares/trans/saveTrans');
const delTransMW = require('../middlewares/trans/delTrans');

const userModel = require('../models/user');
const transModel = require('../models/transaction');
const teamModel = require('../models/team');

module.exports = function (app) {
    const objectRepository = {
        userModel,
        transModel,
        teamModel
    };

    app.get('/transactions',
        authMW(objectRepository),
        getUserMW(objectRepository),
        getTeamListMW(objectRepository),
        getTransListMW(objectRepository),
        renderMW(objectRepository, 'transactions')
    );

    app.use('/transactions/new',
        authMW(objectRepository),
        getUserMW(objectRepository),
        saveTransMW(objectRepository),
        renderMW(objectRepository, 'transactionform')
    );

    app.use('/transactions/edit/:id',
        authMW(objectRepository),
        getUserMW(objectRepository),
        getTransMW(objectRepository),
        saveTransMW(objectRepository),
        renderMW(objectRepository, 'transactionform')
    );

    app.get('/transactions/del/:id',
        authMW(objectRepository),
        getUserMW(objectRepository),
        getTransMW(objectRepository),
        delTransMW(objectRepository),
        function (req, res, next) {
            return res.redirect('/transactions');
        }
    );
};