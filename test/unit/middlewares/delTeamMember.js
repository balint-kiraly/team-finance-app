const expect = require('chai').expect;
const delTeamMemberMW = require('../../../middlewares/team/delTeamMember');

describe('delTeamMember middleware', function () {
    it('should set res.locals.member._teamid to undefined', function (done) {
        const mw = delTeamMemberMW({});

        const mockReq = {};
        const mockRes = {
            locals: {
                member: {
                    _teamid: 'mockteamid',
                    save: () => {
                    }
                }
            }
        };
        const mockNext = (err) => {
            expect(err).to.be.an('undefined');
            expect(mockRes.locals.member._teamid).to.be.an('undefined');
            done();
        }

        mw(mockReq, mockRes, mockNext);
    });
    it('should call next instantly if res.locals.member is undefined', function (done) {
        const mw = delTeamMemberMW({});

        const mockReq = {};
        const mockRes = {
            locals: {}
        };
        const mockNext = (err) => {
            expect(err).to.be.eql('member undefined');
            done();
        }

        mw(mockReq, mockRes, mockNext);
    });
})