'use strict'

module.exports = {
    IsProduction: (process.env.IS_PROFILE_PRODUCTION_ENV !== undefined) ?
    (process.env.IS_PROFILE_PRODUCTION_ENV === 'true') : false,
    BlockChain: {
        privKey: process.env.HCM_PRIV_KEY ? process.env.HCM_PRIV_KEY : 'Some private to sign here'
    }
}