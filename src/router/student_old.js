'use strict'
const express = require('express')
const router = express.Router()
const Student = require('../common/Student.js')
const config = require('../config/Configuration')
const student = new Student()

router.get('(/getInfo/:searchType/:searchKey/:limit/:page)|(/getInfo/:searchType/:searchKey)'
, async (req, res, next) => {
    if(!req.session.isVerified && config.IsProduction) {
        res.status(403).json({
            err: {
                msg: 'You have no permission to get data'
            }
        })
        return 0
    }
    const searchKey = req.params.searchKey.trim().replace(/\++/g, " ")
    const searchType = req.params.searchType
    const limit = (() => {
        switch(parseInt(req.params.limit, 10)) {
            case 25:
                return 25   
            case 50:
                return 50
            case 100:
                return 100
            default:
                return 50
        }
    })()
    const offset = (req.params.page ? req.params.page : 0) * limit
    switch(searchType.toLowerCase()) {
        case 'name': {
            res.status(200).json({
                OK: {
                    msg: await student.getDetailByName(searchKey, limit, offset)
                }
            })
            break
        }
        case 'phone': {
            res.status(200).json({
                OK: {
                    msg: await student.getDetailByPhone(searchKey, limit, offset)
                }
            })
            break
        }
        case 'email': {
            res.status(200).json({
                OK: {
                    msg: await student.getDetailByEmail(searchKey, limit, offset)
                }
            })
            break
        }
        case 'id': {
            res.status(200).json({
                OK: {
                    msg: await student.getDetailById(searchKey)
                }
            })
            break
        }
        case 'student_code': {
            res.status(200).json({
                OK: {
                    msg: await student.getDetailByStudentCode(searchKey, limit, offset)
                }
            })
            break
        }
        default: {
            res.status(400).json({
                err: {
                    msg: 'Not supported API'
                }
            })
        }
    }
})

router.get('/getAmount/:searchType/:searchKey', async (req, res, next) => {
    if(!req.session.isVerified && config.IsProduction) {
        res.status(403).json({
            err: {
                msg: 'You have no permission to get data'
            }
        })
        return 0
    }
    const searchType = req.params.searchType.toLowerCase()
    const searchKey = req.params.searchKey.trim().replace(/\++/g, " ")

    if(student.searchType.includes(searchType)) {
        const amount = await student.getAmount(searchType, searchKey)
        if(typeof amount === 'number') {
            res.status(200).json({
                OK : {
                    msg : amount
                }
            }) 
        } else {
            res.status(502).json({
                err: {
                    msg: 'Internal server failure!'
                }
            })
        }
    } else {
        res.status(400).json({
            err : {
                msg: 'Not supported API'
            }
        })
    }
})

/*
*@params : type is olm, contact, student, status_history
*@params : id in fact
*/
router.get('/getDetail/:type/:id', async (req, res, next) => {
    if(!req.session.isVerified && config.IsProduction) {
        res.status(403).json({
            err: {
                msg: 'You have no permission to get data'
            }
        })
        return 0
    }
    const type = req.params.type
    const id = req.params.id

    switch(type.toLowerCase()) {
        case 'contact' : {
           res.status(200).json({
               OK : {
                   msg : await student.getCrmInfo(id)
               }
           }) 
           break
        }
        case 'student' : {
            res.status(200).json({
                OK : {
                    msg : await student.getStudentInfo(id)
                }
            })
            break
        }
        case 'status_history' : {
            res.status(200).json({
                OK : {
                    msg : await student.getTrangThaiHistory(id)
                }
            })
            break
        }
        case 'fee': {
            res.status(200).json({
                OK: {
                    msg: await student.getFee(id)
                }
            })
            break
        }
        case 'diem': {
            res.status(200).json({
                OK: {
                    msg: await student.getDiem(id)
                }
            })
            break
        }
        default : {
            res.status(400).json({
                err : {
                    msg: 'Not supported API'
                }
            })
        }
    }

})

module.exports = router