const authMW = require('../middleware/auth');
const renderMW = require('..//middleware/render');
const getTransListMW = require('../middleware/getTransList');
const getTransMW = require('../middleware/getTrans');
const saveTransMW = require('../middleware/saveTrans');
const delTransMW = require('../middleware/delTrans');

const userModel = require('../models/user');
const transModel = require('../models/transaction');

module.exports = function (app) {
    const objectRepository = {
        userModel,
        transModel
    };

    app.get('/transactions',
        authMW(objectRepository),
        getTransListMW(objectRepository),
        renderMW(objectRepository, 'transactions')
    );

    app.use('/transactions/new',
        authMW(objectRepository),
        saveTransMW(objectRepository),
        renderMW(objectRepository, 'transactionform')
    );

    app.use('/transactions/edit/:id',
        authMW(objectRepository),
        getTransMW(objectRepository),
        saveTransMW(objectRepository),
        renderMW(objectRepository, 'transactionform')
    );

    app.get('/transactions/del/:id',
        authMW(objectRepository),
        getTransMW(objectRepository),
        delTransMW(objectRepository),
        function (req, res, next) {
            return res.redirect('/transactions');
        }
    );
};