const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')

const Story = require('../models/Story')

// @desc  Show add page
// @route GET /stories/add
router.get('/add', ensureAuth, (req, res) => {
    res.render('stories/add')
})

// @desc  Process add form
// @route POST /stories
router.post('/', ensureAuth, (req, res) => {
    try {
    } catch (err) {
        console.error(err)
        res.render('error/500')
    }
})

module.exports = router
