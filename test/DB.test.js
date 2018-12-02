'use strict'
const chai = require('chai')
const expect = chai.expect
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)

const db = require('../src/common/WareHouse.js')
const config = require('../src/config/Configuration.js')

describe('Check Database and configuration is correct',function() {
    let WareHouse
    before(function() {
        WareHouse = new db(config.WareHouse)
    })
    it('WareHouse init OK', function() {
        expect(db).to.exist

    })
    describe('Test Database connection', () => {
        it('DB object should be imported', () => {
            expect(WareHouse.pool).to.be.an('object')
        })
        it('Pool Connect check', async function() {
            const couldConnect = await WareHouse.pool.query('SELECT 1')
            .then((rows) => {
                return rows
            }).catch((err) => {
                return err
            })
            expect(couldConnect[0][0]).to.deep.equal(1)
        })
        it ('Connection connect check', async function() {
            const couldConnect = await WareHouse.conn.then((conn) => {
                return conn.query('SELECT 1').then((rows) => {
                    return rows
                }).catch((err) => {
                    return err
                })
            }).catch((err) => {
                return err
            })   
            expect(couldConnect[0][0]).to.deep.equal(1)
        })
        it('Get Pool Connection check', async function() {
            const connectToPool = await WareHouse.getPoolConnection().then(conn => {
                return conn.query('SELECT 1').then((rows) => {
                    return rows
                }).catch(err => {
                    return err
                })
            }).catch(err => {
                return err
            })
            expect(connectToPool[0][0]).to.deep.equal(1)
        })
        it ('Check pool end', async function() {
            const isEndOk = await WareHouse.endPool()
            expect(isEndOk).to.equal(1)
        })
    })
    describe('Check Config is imported correctly', () => {
        it('Config import OK', () => {
            expect(config).to.be.an('object')
        })
        describe('Configuration properties does exist', () => {
            it('Check Database configuration', () => {
               expect(config.WareHouse.host).to.be.a('string')
               expect(config.WareHouse.port).to.be.a('string')
               expect(config.WareHouse.database).to.be.a('string') 
               expect(config.WareHouse.user).to.be.a('string') 
               expect(config.WareHouse.password).to.be.a('string') 
               expect(config.WareHouse.timezone).to.be.a('string') 
            })
            it('Check the environment variable is set suscessfully', () => {
                expect(config.WareHouse.host).to.equal(process.env.DB_HOST)
                expect(config.WareHouse.port).to.equal(process.env.DB_PORT)
                expect(config.WareHouse.database).to.equal(process.env.DB_DB)
                expect(config.WareHouse.user).to.equal(process.env.DB_USER)
                expect(config.WareHouse.password).to.equal(process.env.DB_PASSWORD)
                expect(config.WareHouse.timezone).to.equal(process.env.DB_TIMEZONE)
            })
        })
    })
    after(function() {
        WareHouse = null
    })
})