var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  APP_ID: '"wxda10e6b61a107d64"',
  APP_SECRET: '"76d0f76a4260701b9848ff202ce2e540"',
  BASE_API: '"//114.215.133.77:8090/api"'
  // BASE_API: '"//127.0.0.1:8090/api"'
})
