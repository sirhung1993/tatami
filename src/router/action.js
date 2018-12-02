'use strict'
const express = require('express')
const router = express.Router()
const config = require('../config/Configuration')
const Student = require('../common/Student')

router.get('/verify/:student/:sig'
, (req, res, next) => {
    const student = req.params.student
    const sig = req.params.sig
    const isVerified = Student.verifyDegree(student, sig)
    res.json(
        isVerified      
    )
})

router.get('/sign/:student', (req, res, next) => {
    const student = req.params.student
    res.json(
        Student.signDegree(student)
    )
})

router.get('/hash/:student', (req, res, next) => {
    const student = req.params.student
    res.json(
        Student.getHash(student)
    )
})

module.exports = router