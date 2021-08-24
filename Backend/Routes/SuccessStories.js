const express = require('express')
const router = new express.Router()
const SuccessStories = require('../Models/successStory')
const { ensureCorrectUserOrCreator } = require('../Middleware/auth')

//finds all success stories
router.get('/', async (req, res, next) => {
    try {
        const result = await SuccessStories.findAll()
        return res.json(result);
    } catch(e) {
        return next (e)
    }
})

//finds a specific success story with its id
router.get('/:id', async (req, res, next) => {
    try {
        const story = await SuccessStories.get(req.params.id)
        return res.json({ story });
    } catch(e) {
        return next(e)
    }
})

//adds new success story
router.post('/', async (req, res,next) => {
    try {    
        const stories = await SuccessStories.add(req.body)
        return res.status(201).json({ stories })
    } catch(e) {
        return next(e)
    }
})

//delete a story associated with an user given their username
router.delete('/:username', ensureCorrectUserOrCreator, async (req, res, next) => {
    try {
        const story = await SuccessStories.remove(req.params.username)
        return res.json({deleted: req.params.username})
    } catch (e) {
        return next (e)
    }
})

module.exports = router;