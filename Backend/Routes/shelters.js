const express = require('express')
const router = new express.Router()
const jsonschema = require('jsonschema')
const shelterSchema = require('../schemas/newShelterSchema.json')
const Shelter = require('../Models/shelter')
const { BadRequestError } = require("../expressError");
const { ensureCreator } = require('../Middleware/auth')
const db = require('../db')

router.get('/', async (req, res) => {
    try {
        const result = await Shelter.findAll()
        return res.json(result);
    } catch(e) {
        return next (e)
    }
})

router.get('/:name', async (req, res, next) => {
    try {
        const shelter = await Shelter.get(req.params.name)
        return res.json({ shelter });
    } catch(e) {
        return next(e)
    }
})

router.post('/', async (req, res,next) => {
    try {
        const validator = jsonschema.validate(req.body, shelterSchema)
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }        
        const shelters = await Shelter.add(req.body)
        return res.status(201).json({ shelters })
    } catch(e) {
        return next(e)
    }
})

router.delete('/:name', ensureCreator, async (req, res, next) => {
    try {
        const shelter = await Shelter.remove(req.params.name)
        return res.json({deleted: req.params.name})
    } catch (e) {
        return next (e)
    }
})

module.exports = router;