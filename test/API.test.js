'use strict'
const chai = require('chai')
const expect = chai.expect
const assert = chai.assert
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)

const request = require('request')
const Student = require('../src/common/Student.js')
const student = new Student()

const config = require('../src/config/Configuration.js')
const Host = config.IsProduction ? process.env.PROFILE_HOST : 'localhost'
const Port = config.IsProduction ? process.env.PROFILE_PORT : '5000'
const Http = config.IsProduction ? process.env.PROFILE_HTTP : 'http' 
const BaseURL = `${Http}://${Host}:${Port}`

describe('Check response from student get info', function(){
    const ContactsColumnsAlias = student.ContactsColumnsAlias
    const FactsColumnsAlias = student.FactsCrmColumnsAlias
    const FactsSinhVienAlias = student.FactSinhVienColumnsAlias
    const FactTrangThaiColumnsAlias = student.FactTrangThaiColumnsAlias
    const FactDoanhThuAlias = student.FactDoanhThuAlias
    const DiemAlias = student.DiemAlias
    describe('Check basic config is OK', function(){
        it('Host, Port and BaseURL should be correct', function(){
            expect(Host).to.be.a('string')
            expect(Port).to.be.a('string')
            if(config.IsProduction) {
                expect(Host).to.equal(process.env.PROFILE_HOST)
                expect(Port).to.equal(process.env.PROFILE_PORT)
                expect(Http).to.equal(process.env.PROFILE_HTTP)
            }
            expect(BaseURL).to.equal(`${Http}://${Host}:${Port}`)
        })
    })
    describe('Check all API relate to student/getInfo', function(){
        it('GET: student/getInfo must return JSON. Get by name', function(done){
            const nameIndex = 4
            const searchKey = 'Tran Thi Khanh Ly'.replace(/ +/g, "+")
            const searchType = 'name'
            const sub = `${BaseURL}/student/getInfo/${searchType}/${searchKey}`
            request(sub,
                (err, res, body) => {
                    var bodyJson = JSON.parse(body)
                    expect(err).to.be.null
                    expect(res.statusCode).to.match(/2[0-9]{2}/)
                    expect(bodyJson.OK.msg).to.be.an('array')
                    bodyJson.OK.msg.map(col => {
                        expect(col[ContactsColumnsAlias[nameIndex]]).to.be.a('string')
                        assert.isAtLeast(col[ContactsColumnsAlias[nameIndex]].length
                            , searchKey.length, 'Full text search should return more character')
                    })
                    done()
                })
        }) // END of get by name
        it('GET: student/getInfo must return JSON. Get by ma sinh vien', function(done){
            const codeIndex = 11
            const searchKey = 'huehtm'
            const searchType = 'student_code'
            const sub = `${BaseURL}/student/getInfo/${searchType}/${searchKey}`
            request(sub,
                (err, res, body) => {
                    var bodyJson = JSON.parse(body)
                    expect(err).to.be.null
                    expect(res.statusCode).to.match(/2[0-9]{2}/)
                    expect(bodyJson.OK.msg).to.be.an('array')
                    bodyJson.OK.msg.map(col => {
                        expect(col[ContactsColumnsAlias[codeIndex]]).to.be.a('string')
                        assert.isAtLeast(col[ContactsColumnsAlias[codeIndex]].length
                            , searchKey.length, 'Full text search should return equal or more character')
                    })
                    done()
                })
        }) // END of get by ma sinh vien
        it('GET: student/getInfo must return JSON. Get by phone', function(done){
            const phoneIndex = 5
            const searchKey = '988003135'
            const searchType = 'phone'
            const sub = `${BaseURL}/student/getInfo/${searchType}/${searchKey}`
            request(sub, 
                (err, res, body) => {
                    var bodyJson = JSON.parse(body)
                    expect(err).to.be.null
                    expect(res.statusCode).to.match(/2[0-9]{2}/)
                    expect(bodyJson.OK.msg).to.be.an('array')
                    bodyJson.OK.msg.map(col => {
                        expect(col[ContactsColumnsAlias[phoneIndex]]).to.include(`${searchKey}`)
                        assert.isAtLeast(col[ContactsColumnsAlias[phoneIndex]].length
                            , searchKey.length, 'Phone number care about last digits')
                    })
                    done()
                }
            )
        })
        it('GET: student/getInfo must return JSON. Get by email', function(done){
            const mailIndex = 6
            const searchKey = 'sanglongson@gmail.com'
            const goodEmail = searchKey.replace(/@.*/, '')
            const searchType = 'email'
            const sub = `${BaseURL}/student/getInfo/${searchType}/${searchKey}`
            request(sub, 
                (err, res, body) => {
                    var bodyJson = JSON.parse(body)
                    expect(err).to.be.null
                    expect(res.statusCode).to.match(/2[0-9]{2}/)
                    expect(bodyJson.OK.msg).to.be.an('array')
                    bodyJson.OK.msg.map(col => {
                    expect(col[ContactsColumnsAlias[mailIndex]]).to.include(goodEmail)
                        assert.isAtLeast(col[ContactsColumnsAlias[mailIndex]]
                            .replace(/@.*/, '').length
                            , goodEmail.length, 'Email care about first characters before @')
                    })
                    done()
                }
            )
        })
        it('GET: student/getInfo must return JSON. Get by id', function(done){
            const idIndex = 0
            const searchKey = 1
            const searchType = 'id'
            const sub = `${BaseURL}/student/getInfo/${searchType}/${searchKey}`
            request(sub, 
                (err, res, body) => {
                    var bodyJson = JSON.parse(body)
                    expect(err).to.be.null
                    expect(res.statusCode).to.match(/2[0-9]{2}/)
                    expect(bodyJson.OK.msg).to.be.an('array')
                    expect(bodyJson.OK.msg.length).to.equal(1)
                    expect(bodyJson.OK.msg[0][ContactsColumnsAlias[idIndex]]).to.equal(searchKey)
                    done()
                }
            )
        })
    })
    describe('Check all API relate to student/getDetail with given id', function(){
        const detail = `/student/getDetail/`
        it('GET: getDetail by using Id contact for Contact', function(done){
            const type = 'contact'
            const id = 1
            const sub = `${BaseURL}${detail}${type}/${id}`
            const IdCol = 0
            request(sub,
                (err, res, body) => {
                    var bodyJson = JSON.parse(body)
                    expect(err).to.be.null
                    expect(res.statusCode).to.match(/2[0-9]{2}/)
                    expect(bodyJson.OK.msg).to.be.an('array')
                    expect(bodyJson.OK.msg[0][FactsColumnsAlias[IdCol]]).to.equal(id)
                })          
            done()
        })
        it('GET: getDetail by using Id contact for Student', function(done){
            const type = 'student'
            const id = 1
            const sub = `${BaseURL}${detail}${type}/${id}`
            const IdCol = 0
            request(sub,
                (err, res, body) => {
                    var bodyJson = JSON.parse(body)
                    expect(err).to.be.null
                    expect(res.statusCode).to.match(/2[0-9]{2}/)
                    expect(bodyJson.OK.msg).to.be.an('array')
                    expect(bodyJson.OK.msg[0][FactsSinhVienAlias[IdCol]]).to.equal(id)
                })          
            done()
        })
        it('GET: getDetail by using Id contact for status history', function(done){
            const type = 'status_history'
            const id = 1
            const sub = `${BaseURL}${detail}${type}/${id}`
            const ContactCol = 1
            request(sub,
                (err, res, body) => {
                    var bodyJson = JSON.parse(body)
                    expect(err).to.be.null
                    expect(res.statusCode).to.match(/2[0-9]{2}/)
                    expect(bodyJson.OK.msg).to.be.an('array')
                    bodyJson.OK.msg.map(obj => {
                        expect(obj[FactTrangThaiColumnsAlias[ContactCol]]).to.equal(id)
                    })
                })          
            done()
        })
        it('GET: getDetail by using Id contact for Fee', function(done){
            const type = 'fee'
            const id = 460
            const sub = `${BaseURL}${detail}${type}/${id}`
            const ContactCol = 0
            request(sub,
                (err, res, body) => {
                    var bodyJson = JSON.parse(body)
                    expect(err).to.be.null
                    expect(res.statusCode).to.match(/2[0-9]{2}/)
                    expect(bodyJson.OK.msg).to.be.an('array')
                    bodyJson.OK.msg.map(obj => {
                        expect(obj[FactDoanhThuAlias[ContactCol]]).to.equal(id)
                    })
                })          
            done()
        })//END OF getFee

        it('GET: getDetail by using Id contact for Diem', function(done){
            const type = 'diem'
            const id = 460
            const sub = `${BaseURL}${detail}${type}/${id}`
            const IdCol = 1
            request(sub,
                (err, res, body) => {
                    var bodyJson = JSON.parse(body)
                    expect(err).to.be.null
                    expect(res.statusCode).to.match(/2[0-9]{2}/)
                    expect(bodyJson.OK.msg).to.be.an('array')
                    bodyJson.OK.msg.map(obj => {
                        expect(obj[DiemAlias[IdCol]]).to.equal(id)
                    })
                })          
            done()
        })
    })
    describe('Check all API relate to student/getAmount with given searchkey and searchtype', function(){
        const getAmount = `/student/getAmount/`
        it('Check student/getAmount with searchType: name', function(done){
            const type = 'name'
            const key = 'Hung'
            const sub = `${BaseURL}${getAmount}${type}/${key}`
            request(sub,
                (err, res, body) => {
                    var bodyJson = JSON.parse(body)
                    expect(err).to.be.null
                    expect(res.statusCode).to.match(/2[0-9]{2}/)
                    expect(bodyJson.OK.msg).to.be.a('number')
                })          
            done()
        })
        it('Check student/getAmount with searchType: phone', function(done){
            const type = 'phone'
            const key = '56789'
            const sub = `${BaseURL}${getAmount}${type}/${key}`
            request(sub,
                (err, res, body) => {
                    var bodyJson = JSON.parse(body)
                    expect(err).to.be.null
                    expect(res.statusCode).to.match(/2[0-9]{2}/)
                    expect(bodyJson.OK.msg).to.be.a('number')
                })          
            done()
        })
        it('Check student/getAmount with searchType: email', function(done){
            const type = 'email'
            const key = 'hung'
            const sub = `${BaseURL}${getAmount}${type}/${key}`
            request(sub,
                (err, res, body) => {
                    var bodyJson = JSON.parse(body)
                    expect(err).to.be.null
                    expect(res.statusCode).to.match(/2[0-9]{2}/)
                    expect(bodyJson.OK.msg).to.be.a('number')
                })          
            done()
        })
        it('Check student/getAmount with searchType: student_code', function(done){
            const type = 'student_code'
            const key = 'hung'
            const sub = `${BaseURL}${getAmount}${type}/${key}`
            request(sub,
                (err, res, body) => {
                    var bodyJson = JSON.parse(body)
                    expect(err).to.be.null
                    expect(res.statusCode).to.match(/2[0-9]{2}/)
                    expect(bodyJson.OK.msg).to.be.a('number')
                })          
            done()
        })
    })
})