const express = require('express')
const router = new express.Router()
const jsonschema = require('jsonschema')
const storySchema = require('../schemas/newShelterSchema.json')
const SuccessStories = require('../Models/successStory')
const { BadRequestError } = require("../expressError");
const { ensureCreator } = require('../Middleware/auth')
const db = require('../db')

router.get('/', async (req, res, next) => {
    try {
        const result = await SuccessStories.findAll()
        return res.json(result);
    } catch(e) {
        return next (e)
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const story = await SuccessStories.get(req.params.id)
        return res.json({ story });
    } catch(e) {
        return next(e)
    }
})

router.post('/', async (req, res,next) => {
    try {
        // const validator = jsonschema.validate(req.body, shelterSchema)
        // if (!validator.valid) {
        //     const errs = validator.errors.map(e => e.stack);
        //     throw new BadRequestError(errs);
        // }        
        const stories = await SuccessStories.add(req.body)
        return res.status(201).json({ stories })
    } catch(e) {
        return next(e)
    }
})

router.delete('/:name', ensureCreator, async (req, res, next) => {
    try {
        const story = await SuccessStories.remove(req.params.id)
        return res.json({deleted: req.params.name})
    } catch (e) {
        return next (e)
    }
})

module.exports = router;