const authMW = require('../middleware/auth');
const getTeamListMW = require('../middleware/getTeamList');
const renderMW = require('..//middleware/render');
const checkNewMemberMW = require('../middleware/checkNewMember');
const delTeamMemberMW = require('../middleware/delTeamMember');

const userModel = require('../models/user');
const transModel = require('../models/transaction');

module.exports = function (app) {
    const objectRepository = {
        userModel,
        transModel
    };

    app.get('/team',
        authMW(objectRepository),
        getTeamListMW(objectRepository),
        renderMW(objectRepository, 'team')
    );

    app.post('/team/add',
        authMW(objectRepository),
        checkNewMemberMW(objectRepository),
        renderMW(objectRepository, 'team')
    );

    app.post('/team/del/:userid',
        authMW(objectRepository),
        delTeamMemberMW(objectRepository),
        renderMW(objectRepository, 'team')
    );
};