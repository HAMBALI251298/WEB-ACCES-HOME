const express = require('express');
const consign = require('consign');

const bankHambaliAPI = express();

//
// consign({ verbose: false })
consign()
  .include('libs/models.js')
  .then('libs/middlewares.js')
  .then('routes')
  .then('libs/boot.js')
  .into(bankHambaliAPI);

module.exports = bankHambaliAPI;
