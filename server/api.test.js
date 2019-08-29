const request = require('supertest');
const mongoose = require('mongoose');
const app = require('./app');

describe('GET /', () => {
  beforeEach(async () => {
    const url = 'mongodb://127.0.0.1/27017';
    await mongoose.connect(url, {useNewUrlParser: true});
  });

  it('is successful', () => {
    request(app)
      .get('/')
      .expect(200);
  });
});
