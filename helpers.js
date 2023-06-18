const supertest = require('supertest');
const chai = require('chai');
const api = require('../bankaAPI');

global.app = api;
global.request = supertest(api);
global.expect = chai.expect;
global.assert = chai.assert;
