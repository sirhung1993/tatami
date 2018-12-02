'use strict'
const db = require('mariadb')

module.exports = class WareHouse {

    constructor(config) {
        this.pool = this.getPool(config)
        this.conn = this.getConnection(config)
    }

    getPool(config) {
        try {
            this.pool = db.createPool(config)
        } catch (err) {
            console.log(err)
        }
        return this.pool
    }

    getConnection(config) {
        try {
            this.conn = db.createConnection(config)
        } catch(err) {
            console.log(err)
        }
        return this.conn
    }

    getPoolConnection() {
        return this.pool.getConnection() 
    }

    endPool() {
        return this.pool.end()
            .then(() => {
                return 1
            }).catch((err) => {
                return err
            })
    }
}