const express = require('express')
const router = new express.Router()
const jsonschema = require('jsonschema')
const userSchema = require('../schemas/newUserschema.json')
const userUpdateSchema = require('../schemas/updateUserSchema.json')
const userAuth = require('../schemas/userAuth.json')
const User = require('../Models/user')
const { BadRequestError } = require("../expressError");
const { createToken } = require('../Helpers/tokens')
const { ensureCorrectUserOrCreator, ensureCreator } = require('../Middleware/auth')

//s3 imports
const generateUploadURL = require('./s3.js')

//Only the creator is allowed to find all users 
router.get('/', async (req, res) => {
    const q = req.query;
    if (q.name === undefined) q.name = "";
    const users = await User.findAll(q)
    return res.json({ users });
})

//Anyone is able to register for service
router.post('/register', async (req, res, next) => {
    try {
        const validator = jsonschema.validate(req.body, userSchema)
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }
        const user = await User.register(req.body)
        const token = createToken(user)
        return res.status(201).json({ user, token });
    } catch(e) {
        return next(e)
    }
})

router.get('/s3Url', async (req, res) => {
    const url = await generateUploadURL()
    res.send({ url })
})

//Anyone is able to login
router.post('/login', async (req, res, next) => {

    const validator = jsonschema.validate(req.body, userAuth)
    if (!validator.valid) {
        const errs = validator.errors.map(e => e.stack);
        throw new BadRequestError('username and password required');
    }
    try {
        const {username, password} = req.body
        const user = await User.authenticate(username, password)
        const token = createToken(user)
        return res.json({ user, token })
    } catch(e) {
        return next (e)
    }
})

router.get('/:username', async (req, res, next) => {
    try {
        const username = req.params.username
        const user = await User.get(username)
        return res.json(user);
    } catch(e) {
        return next(e)
    }
})

router.patch("/:username", ensureCorrectUserOrCreator, async function (req, res, next) {
    try {
      const validator = jsonschema.validate(req.body, userUpdateSchema);
      if (!validator.valid) {
        const errs = validator.errors.map(e => e.stack);
        throw new BadRequestError(errs);
      }
  
    console.log(`in users patch`)
      const user = await User.update(req.params.username, req.body);
      return res.json({ user });
    } catch (err) {
      return next(err);
    }
});

  
router.delete('/:username', ensureCorrectUserOrCreator, async (req, res, next) =>{
    try {
        const user = await User.remove(req.params.username)
        return res.json({ deleted: req.params.username })
    } catch(e) {
        return next(e)
    }
})

module.exports = router;