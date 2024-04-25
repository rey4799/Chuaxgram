const bcrypt =  require('bcryptjs')
const { op } = require("sequelize");
const {User,Profile} = require("../models")

class Controller{

    static home (req, res){
        // res.send('halo')
        res.render('home')
    }

    static registerform(req, res){
        res.render('registerform')
    }

    static loginForm(req, res){
        let {error} = req.query


        res.render('loginForm', {error})
    }

    static async postRegister(req, res){
        try {
            const {username, email, password, Role, fullName, bio, avatarUrl } = req.body;
            const newUser = await User.create({username, email, password, Role});
            // console.log(newUser);
            // console.log({id, username, email, password, Role});
            await Profile.create({fullName, bio, avatarUrl, UserId: newUser.id});
            res.redirect('/login');
        } catch (err) {
            res.send(err);
        }
    }

   static postlogin(req, res){
    const { username, password} = req.body
    
    User.findOne({where: {username}})
    .then(user => {
        if (user) {
            const isValidPassword = bcrypt.compareSync(password, user.password)

            if (isValidPassword){

                req.session.UserId = User.id
                return res.redirect('/')
            }else {
                const error = 'invalid username/password'
                return res.redirect(`/login?error=${error}`)
            }
        }else {const error = 'invalid username/password'
        return res.redirect(`/login?error=${error}`)

        }
    })
    .catch(err => res.send(err))
   }
}

module.exports = Controller