const express = require('express')
const router = new express.Router()
const wishList = require('../Models/wishList')

//finds all wishes in the database
router.get('/', async (req, res) => {
    try {
        const result = await wishList.findAll()
        return res.json(result);
    } catch(e) {
        return next (e)
    }
})

//adds a new wish 
router.post('/', async (req, res,next) => {
    try {
        const wish = await wishList.add(req.body)
        return res.status(201).json({ wish })
    } catch(e) {
        return next(e)
    }
})

//deletes a wish given its id
router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        const wish = await wishList.remove({id})
        return res.json({deleted: id})
    } catch (e) {
        return next (e)
    }
})

module.exports = router;