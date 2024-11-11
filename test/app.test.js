const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');  // Adjust the path if necessary
const cookieParser = require('cookie-parser');
const { application } = require('express');




describe('GET /', () => {
  it('should return the home page', (done) => {
    request(app)
      .get('/')
      .expect('Content-Type', /html/)
      .expect(200, done);
  });
});

describe('GET /about', () => {
  it('should return the about page', (done) =>{
    request(app)
      .get('/about')
      .expect('Content-Type', /html/)
      .expect(200, done);
  });
});

describe('GET /contact', () => {
  it('should return the contact page', (done) =>{
    request(app)
      .get('/contact')
      .expect('Content-Type', /html/)
      .expect(200, done);
  });
});

describe('GET /foulWeather', () => {
  it('should return the foulWeather page', (done) =>{
    request(app)
      .get('/foulWeather')
      .expect('Content-Type', /html/)
      .expect(200, done);
  });
});

describe('GET /eggPruchase', () => {
  it('should return the eggPurchase page', (done) =>{
    request(app)
      .get('/eggPurchase')
      .expect('Content-Type', /html/)
      .expect(200, done);
  });
});

describe('POST /send-userLogin', () => {
  it('should try to log in and return success', (done) => {
    request(app)
      .post('/send-userLogin')
      .send({ user: 'test@test', password: 'testPassword' })
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.loginSuccess).to.be.true;
        done();
      });
  });
})

describe('POST /send-userLogin', () => {
  it('should fail to log in and return a error 500', (done) => {
    request(app)
      .post('/send-userLogin')
      .send({ user: 'test@test', password: 'badPassword' })
      .expect('Content-Type', /json/)
      .expect(500)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
})

describe('POST /send-userLogin', () => {
  it('should fail to log in and return a error 500', (done) => {
    request(app)
      .post('/send-userLogin')
      .send({user: 'bad@user', password: 'password' })
      .expect('Content-Type', /json/)
      .expect(500)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
})

describe('POST /send-userLogin', () => {
  it('should fail to log in and return a error 418', (done) => {
    request(app)
      .post('/send-userLogin')
      .send({user: '', password: 'password' })
      .expect('Content-Type', /json/)
      .expect(418)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
})

describe('POST /send-userLogOut', () => {
  it('should log out of user and return success', (done) => {
    request(app)
      .post('/send-userLogOff')
      .send({ user: 'test@test'})
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.logOutSuccess).to.be.true;
        done();
      });
  });
})

describe('POST /send-userLogOut', () => {
  it('should fail log out of user and return false for logout', (done) => {
    request(app)
      .post('/send-userLogOff')
      .send({ user: 'badUser@test'})
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.logOutSuccess).to.be.false;
        done();
      });
  });
})

describe('POST /send-userLogOut', () => {
  it('should fail log out of user and return false for logout', (done) => {
    request(app)
      .post('/send-userLogOff')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.logOutSuccess).to.be.false;
        done();
      });
  });
})

describe('GET /admin-check', () => {
  it('should return a false (no session key)', (done) => {
    request(app)
      .get('/admin-check')
      .expect('Content-Type', /json/)
      .expect(200, done)
      
    })
})

describe('POST /buyEggs', () => {
  it("should return a succes goodEggs", (done) => {
    request(app)
    .post('/buyEggs')
    .send({customer: "test@test", duckEggs: 1, gooseEggs: 1, chickenEggs: 1 })
    .expect('Content-Type', /json/)
    .end((err, res) => {
      if(err) return done(err);
      expect(res.body.eggsGood).to.be.true;
      done();
    });
  });
})



// describe('GET /get-users', () => {
//   it('should return a list of online users', (done) => {
//     request(app)
//       .get('/get-users')
//       .expect('Content-Type', /json/)
//       .expect(200)
//       .end((err, res) => {
//         if (err) return done(err);
//         expect(res.body).to.be.an('array');
//         done();
//       });
//   });
// });

// describe('GET /get-messages', () => {
//   it('should return a list of messages', (done) => {
//     request(app)
//       .get('/get-messages')
//       .expect('Content-Type', /json/)
//       .expect(200)
//       .end((err, res) => {
//         if (err) return done(err);
//         expect(res.body).to.be.an('array');
//         done();
//       });
//   });
// });

// describe('GET /query-admins', () => {
//   it('should return a list of admins', (done) => {
//     request(app)
//       .get('/query-admins')
//       .expect('Content-Type', /json/)
//       .expect(200)
//       .end((err, res) => {
//         if (err) return done(err);
//         expect(res.body).to.be.an('array');
//         done();
//       });
//   });
// });

// describe('GET /query-recent-users', () => {
//   it('should return the last 3 users online', (done) => {
//     request(app)
//       .get('/query-recent-users')
//       .expect('Content-Type', /json/)
//       .expect(200)
//       .end((err, res) => {
//         if (err) return done(err);
//         expect(res.body).to.be.an('array').that.has.lengthOf.at.most(3);
//         done();
//       });
//   });
// });

// describe('GET /query-recent-messages', () => {
//   it('should return the last 5 messages', (done) => {
//     request(app)
//       .get('/query-recent-messages')
//       .expect('Content-Type', /json/)
//       .expect(200)
//       .end((err, res) => {
//         if (err) return done(err);
//         expect(res.body).to.be.an('array').that.has.lengthOf.at.most(5);
//         done();
//       });
//   });
// });