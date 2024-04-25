const bcrypt =  require('bcryptjs')

class Controller{

    static home (req, res){
        // res.send('halo')
        res.render('home')
    }

    static registerform(req, res){
        res.render('registerform')
    }

    static loginForm(req, res){
        res.render('loginForm')
    }

    static postRegister(req, res){
        const {username, email, password, role} = req.body

        User.create({username, email, password, role})
        .then(newUser => {
            res.redirect('/login')
        })
        .catch(err => res.send(err))
    }

   static postlogin(req, res){
    const { username, password} = req.body
    
    User.findOne({where: {username}})
    .then(user => {
        if (user) {
            const isValidPassword = bcrypt.compareSync(password, user.password)
        }
    })
   }
}

module.exports = Controller