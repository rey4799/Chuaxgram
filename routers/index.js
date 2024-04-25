const express = require("express");
const Controller = require("../controllers/controller.js");
const router = express.Router();

router.get('/', Controller.home)

router.get('/register', Controller.registerform)

router.post('/register', Controller.postRegister)

router.get('/login',  Controller.loginForm)

router.post('/login', Controller.postlogin)

router.use(function (req, res, next){
    if (!req.session.UserId){
        const error = 'Please Login First!'
        res.redirect(`/login?error=${error}`)
    }
})

// router.get('/posts', Controller.showPosts)

// router.get('/users', Controller.ShowAllUser)

// router.get('/profile', Controller.ShowProfile)


module.exports = router