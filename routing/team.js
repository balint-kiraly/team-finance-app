const authMW = require('../middleware/auth/auth');
const getUserMW = require('../middleware/getUser');
const getMemberMW = require('../middleware/team/getMember');
const getTeamListMW = require('../middleware/team/getTeamList');
const renderMW = require('../middleware/render');
const checkNewMemberMW = require('../middleware/team/checkNewMember');
const delTeamMemberMW = require('../middleware/team/delTeamMember');

const userModel = require('../models/user');
const transModel = require('../models/transaction');
const teamModel = require('../models/team');

module.exports = function (app) {
    const objectRepository = {
        userModel,
        transModel,
        teamModel
    };

    app.get('/team',
        authMW(objectRepository),
        getUserMW(objectRepository),
        getTeamListMW(objectRepository),
        renderMW(objectRepository, 'team')
    );

    app.post('/team/add',
        authMW(objectRepository),
        getUserMW(objectRepository),
        getTeamListMW(objectRepository),
        checkNewMemberMW(objectRepository),
        renderMW(objectRepository, 'team')
    );

    app.get('/team/del/:userid',
        authMW(objectRepository),
        getMemberMW(objectRepository),
        delTeamMemberMW(objectRepository),
        function (req, res, next) {
            return res.redirect('/team');
        }
    );
};