const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')

// @desc  Login/Landing page
// @route GET /
router.get('/', ensureGuest, (req, res) => {
    res.render('login', {
        layout: 'login',
    })
})

// @desc  Deshboard
// @route GET /dashboard
router.get('/dashboard', ensureAuth, (req, res) => {
    res.render('dashboard')
})

module.exports = router
