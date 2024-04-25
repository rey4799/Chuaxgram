const express = require("express");
const Controller = require("../controllers/controller.js");
const router = express.Router();


router.get('/', Controller.home);

router.get('/login', Controller.loginForm);

router.post('/login', Controller.postlogin);

router.get('/register', Controller.registerform);

router.post('/register', Controller.postRegister);


router.use(function (req, res, next){
    if (!req.session.UserId){
        const error = 'Please Login First!';
        return res.redirect(`/login?error=${error}`);
    } else {
        next();
    }
});

router.get('/logout', Controller.logout);


router.get('/posts', Controller.showPosts)

router.get('/users', Controller.ShowAllUser)

router.get('/profile', Controller.showProfile)

router.get('/profile/edit', Controller.editProfileForm);

router.post('/profile/edit', Controller.editProfile);

router.get('/posts/new', Controller.showNewPostForm);

router.post('/posts/new', Controller.createNewPost);

router.get('/posts/delete/:postId', Controller.deletePost);


module.exports = router