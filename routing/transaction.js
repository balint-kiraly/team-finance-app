const authMW = require('../middleware/auth');
const renderMW = require('..//middleware/render');
const getTransListMW = require('../middleware/getTransList');
const getTransMW = require('../middleware/getTrans');
const updateTransMW = require('../middleware/updateTrans');
const delTransMW = require('../middleware/delTrans');

module.exports = function (app) {
    const objectRepository = {};

    app.get('/transactions',
        authMW(objectRepository),
        getTransListMW(objectRepository),
        renderMW(objectRepository, 'transactions')
    );

    app.use('/transactions/new',
        authMW(objectRepository),
        updateTransMW(objectRepository),
        renderMW(objectRepository, 'transaction_edit')
    );

    app.use('/transactions/edit/:id ',
        authMW(objectRepository),
        getTransMW(objectRepository),
        updateTransMW(objectRepository),
        renderMW(objectRepository, 'transaction_edit')
    );

    app.get('/transactions/del/:id ',
        authMW(objectRepository),
        getTransMW(objectRepository),
        delTransMW(objectRepository),
        function (req, res, next) {
            return res.redirect('/transactions');
        }
    );
};