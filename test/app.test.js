const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');  // Adjust the path if necessary
const cookieParser = require('cookie-parser');


describe('GET /', () => {
  it('should return the home page', (done) => {
    request(app)
      .get('/')
      .expect('Content-Type', /html/)
      .expect(200, done);
  });
});

describe('/about', () => {
  it('should return the about page', (done) =>{
    request(app)
      .get('/about')
      .expect('Content-Type', /html/)
      .expect(200, done);
  });
});

describe('/contact', () => {
  it('should return the contact page', (done) =>{
    request(app)
      .get('/contact')
      .expect('Content-Type', /html/)
      .expect(200, done);
  });
});

describe('/foulWeather', () => {
  it('should return the foulWeather page', (done) =>{
    request(app)
      .get('/foulWeather')
      .expect('Content-Type', /html/)
      .expect(200, done);
  });
});

describe('/eggPruchase', () => {
  it('should return the eggPurchase page', (done) =>{
    request(app)
      .get('/eggPurchase')
      .expect('Content-Type', /html/)
      .expect(200, done);
  });
});

describe('POST /send-loggin', () => {
  it('should try to log in  and return success', (done) => {
    request(app)
      .post('/send-message')
      .send({ username: 'test@test', password: 'testPassword' })
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.loginSuccess).to.be.true;
        done();
      });
  });

//   it('should fail when username or message is missing', (done) => {
//     request(app)
//       .post('/send-message')
//       .send({ username: 'TestUser' })  // Missing message
//       .expect('Content-Type', /json/)
//       .expect(400)  // Bad request
//       .end((err, res) => {
//         if (err) return done(err);
//         expect(res.body.error).to.equal('Username and message are required');
//         done();
//       });
//   });
// });

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