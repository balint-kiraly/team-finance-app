const authMW = require('../middlewares/auth/auth');
const getUserMW = require('../middlewares/getUser');
const getMemberMW = require('../middlewares/team/getMember');
const getTeamListMW = require('../middlewares/team/getTeamList');
const renderMW = require('../middlewares/render');
const checkNewMemberMW = require('../middlewares/team/checkNewMember');
const delTeamMemberMW = require('../middlewares/team/delTeamMember');

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