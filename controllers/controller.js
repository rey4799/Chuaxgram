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

   
}

module.exports = Controller