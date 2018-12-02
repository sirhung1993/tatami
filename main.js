'use strict'
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const path    = require("path");
const Action = require('./src/router/action')
const config = require('./src/config/Configuration')

app.use(express.static(path.join(__dirname, 'src/react/build')));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.set('port', (process.env.PROFILE_PORT || 5000))
app.set('host', (process.env.PROFILE_HOST || 'localhost'))

app.use('/action', Action)

app.get('/*', (req, res, next) => {
    res.sendFile(path.join(__dirname+'/src/react/build/index.html'))
})

app.listen(app.get('port'), () => {
  console.log(`Server is running at ${app.get('host')}:${app.get('port')}`)
})
