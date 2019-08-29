const request = require('supertest');
const mongoose = require('mongoose');
const app = require('./server');
const Product = require('./Product');

describe('Server', () => {
  describe('without acessing MongoDB', () => {
    afterEach(() => {
      app.close();
    });

    it('is successful', done => {
      request(app)
        .get('/')
        .expect(200, done);
    });

    it('finds our stampler', done => {
      request(app)
        .get('/')
        .expect(/Stampler/)
        .expect(200, done);
    });
  });

  describe('acessing MongoDB direcly', () => {
    afterEach(() => {
      Product.deleteOne({title: 'skate'}).exec();
    });

    beforeEach(async () => {
      const url = 'mongodb://127.0.0.1:27017/test';
      await mongoose.connect(url, {useNewUrlParser: true});
      delete mongoose.connection.models.Product;
    });

    it('creates and finds a skate', done => {
      const skate = new Product({title: 'skate'});
      skate.save();
      request(app)
        .get('/')
        .expect('Content-Type', /json/)
        .expect(/skate/)
        .expect(200, done);
    });
  });
});
