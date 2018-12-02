'use strict'
const express = require('express')
const router = express.Router()
const Student = require('../common/Student.js')
const config = require('../config/Configuration.js')
const Cryptr = require('cryptr')
const request = require('request')
const GoogleOAuth2 = 'https://www.googleapis.com/oauth2/v3/tokeninfo?id_token='

router.post('/', (req, res, next) => {
    const email = req.body.email
    const cryptr = new Cryptr(email.replace(/@.*/, ''))    
    const tokenId = cryptr.decrypt(req.body.tokenId)
    request(`${GoogleOAuth2}${tokenId}`, (err, respond, body) => {
      const bodyJSON = JSON.parse(body)
      const email = bodyJSON.email.split('@')
      const account = email[0]
      const company = email[1]
      if(config.LoginUser.AuthorizedAccount.includes(account) 
      && company === config.LoginUser.AuthorizedEmail ) {
        req.session.isVerified = true
        req.session.account = account
        res.status(200).json({
          OK : {
            msg: true
          }
        })
      } else {
        res.status(403).json({
          err : {
            msg : 'Invalid email or no read permission!'
          }
        })
      }
    })
})

router.get('/status', (req, res, next) => {
    if(req.session.isVerified || !config.IsProduction) {
        res.status(200).json({
            OK: {
                msg: true
            }
        })
    } else {
        res.status(200).json({
            OK: {
                msg:false 
            }
        })
    }
})

module.exports = router