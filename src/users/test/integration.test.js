const chai = require('chai');
const { it, describe } = require('mocha');
const chaiHttp = require('chai-http');

const app = require('../../app').app;

chai.use(chaiHttp);

describe('Suite de test de integracion de usuarios', () => {
  it('Should return 204 when I delete my own user with my credentials', (done) => {
    chai.request(app)
      .delete('/api/v1/users/me')
      .set('Authorization', 'JWT my-token')
      .end((err, res) => {
        chai.assert.equal(res.status, 204);
      })
      done();
  })

  it('Should return 200 when I get all users', (done) => {
    chai.request(app)
      .get('/api/v1/users')
      .end((err, res) => {
        chai.assert.equal(res.status, 200);
      })
      done();
  })
  
  it('Should return 200 when I sent a correct  ID in params',(done)=>{
    chai.request(app)
      .get('/api/v1/users/d9dbc589-36ff-4773-a77f-f0112834d7f4')
      .set('Authorization', 'JWT')
      .end((err, res) => {
        chai.assert.equal(res.status, 200);
        chai.assert.property(res.body, 'id');
        chai.assert.property(res.body, 'email');
        chai.assert.property(res.body, 'rol');
        chai.assert.equal(res.body.rol, 'admin');
      })
  })
})