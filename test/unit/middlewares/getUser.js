const expect = require('chai').expect;
const getUserMW = require('../../../middlewares/getUser');

describe('getUser middleware', function () {
    it('should set re.locals.user to a username from db', function (done) {
        const mw = getUserMW({
            userModel: {
                findOne: (p1, cb) => {
                    expect(p1).to.be.eql({_id: 'mockuserid'});
                    cb(null, 'mockuser');
                }
            }
        });

        const mockReq = {
            session: {
                userid: 'mockuserid'
            }
        };
        const mockRes = {
            locals: {}
        };
        const mockNext = (err) => {
            expect(err).to.be.an('undefined');
            expect(mockRes.locals).to.include({user: 'mockuser'});
            done();
        }

        mw(mockReq, mockRes, mockNext);
    });
    it('should call next with error if there is an error during db communication', function (done) {
        const mw = getUserMW({
            userModel: {
                findOne: (p1, cb) => {
                    expect(p1).to.be.eql({_id: 'mockuserid'});
                    cb('mockerror', null);
                }
            }
        });

        const mockReq = {
            session: {
                userid: 'mockuserid'
            }
        };
        const mockRes = {
            locals: {}
        };
        const mockNext = (err) => {
            expect(err).to.be.eql('mockerror');
            done();
        }

        mw(mockReq, mockRes, mockNext);
    });
})