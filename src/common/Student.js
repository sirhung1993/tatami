'use strict'
const config = require('../config/Configuration')
const ecc = require('eosjs-ecc')

const privKey =  config.BlockChain.privKey
const pubKey = ecc.privateToPublic(privKey)

module.exports = {
    verifyDegree: (student, sig) => {
        const data = ecc.sha256(student + pubKey)
        try {
            return {
                isVerified : ecc.recover(sig, data) === pubKey
            }
            
        } catch(err) {
            return {
                error: err
            }
        }
    },
    signDegree: (student) => {
        try {
            var data = ecc.sha256( student + pubKey)
            var sig = ecc.sign(data, privKey)
            return {
                data: data,
                sig: sig
            }
        } catch(err) {
            return {
                error: err
            }
        }

    },
    getHash: (student) => {
        try {
            const data = ecc.sha256(student + pubKey)
            return {
                hash: data
            }
        } catch(err) {
            return {
                error: err
            }
        }
    }
}