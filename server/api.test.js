const request = require('supertest');
const mongoose = require('mongoose');
const app = require('./app');
const Product = require('./Product');

describe('GET /', () => {
  //change this descibre
  beforeEach(async () => {
    const url = 'mongodb://127.0.0.1:27017/test';
    await mongoose.connect(url, {useNewUrlParser: true});
    delete mongoose.connection.models.Product;
  });

  afterEach(() => {
    Product.deleteOne({title: 'skate'}).exec(); //try to run only after the specific test
    app.close();
  });

  it('connects', done => {
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
