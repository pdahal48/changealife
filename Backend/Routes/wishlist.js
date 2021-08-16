const express = require('express')
const router = new express.Router()
const wishList = require('../Models/wishList')
const { ensureCorrectUserOrCreator, ensureCreator } = require('../Middleware/auth')

const db = require('../db')

router.get('/', async (req, res) => {
    try {
        const result = await wishList.findAll()
        return res.json(result);
    } catch(e) {
        return next (e)
    }
})

router.post('/', async (req, res,next) => {
    try {
        const wish = await wishList.add(req.body)
        return res.status(201).json({ wish })
    } catch(e) {
        return next(e)
    }
})

router.delete('/:id', ensureCorrectUserOrCreator, async (req, res, next) => {
    try {
        const { id } = req.params
        const wish = await wishList.remove({id})
        return res.json({deleted: id})
    } catch (e) {
        return next (e)
    }
})

module.exports = router;