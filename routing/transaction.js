const authMW = require('../middleware/auth/auth');
const getUserMW = require("../middleware/getUser");
const renderMW = require('..//middleware/render');
const getTeamListMW = require('../middleware/team/getTeamList');
const getTransListMW = require('../middleware/trans/getTransList');
const getTransMW = require('../middleware/trans/getTrans');
const saveTransMW = require('../middleware/trans/saveTrans');
const delTransMW = require('../middleware/trans/delTrans');

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