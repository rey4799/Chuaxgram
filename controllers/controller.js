const bcrypt =  require('bcryptjs')
const { op } = require("sequelize");
const {User,Profile, Post} = require("../models")

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

    static async postlogin(req, res){
        const { username, password } = req.body;
        try {
            const user = await User.findOne({ where: { username } });
            if (user) {
                const isValidPassword = await bcrypt.compare(password, user.password);
                if (isValidPassword){
                    req.session.UserId = user.id;
                    req.session.role = user.Role; // Fixed assigning user.Role instead of User.Role
                    return res.redirect('/posts');
                } else {
                    const error = 'Invalid username/password';
                    return res.redirect(`/login?error=${error}`);
                }
            } else {
                const error = 'Invalid username/password';
                return res.redirect(`/login?error=${error}`);
            }
        } catch (err) {
            res.send(err);
        }
    }

   static logout(req, res) {
    req.session.destroy((err) => {
        if (err) {
            res.send(err);
        } else {
            res.redirect('/login');
        }
    });
   }   

   static async showPosts(req,res) {
    try {
        
        const posts = await Post.findAll({
            include: [{ model: User }] 
        });

        
        res.render('posts', { posts: posts });
    } catch (error) {
        
        res.status(500).send(error.message);
    }
   }

   static async ShowAllUser(req, res){
    try {
        const { username } = req.query;
        const whereCondition = username ? { username: { [op.iLike]: `%${username}%` } } : {};
        const users = await User.findAll({
            where: whereCondition,
            include: { model: Profile }
        });
        res.render('users', { users: users });
    } catch (error) {
        res.send(error.message);
    }
}

   static async showProfile(req, res) {
    try {
        const userId = req.session.UserId;
        const profile = await Profile.findOne({ 
            where: { UserId: userId },
            include: [{ 
                model: User,
                include: {
                    model: Post,
                    order: [['createdAt', 'DESC']] 
                }
            }] 
        });

        if (profile) {
            res.render('profile', { profile: profile });
        } else {
            const error = 'Profile not found';
            res.status(404).render('error', { error: error });
        }
    } catch (error) {
        res.send(error.message);
    }
}

static editProfileForm(req, res) {
    // Dapatkan ID pengguna dari sesi
    const userId = req.session.UserId;

    // Cari pengguna berdasarkan ID
    User.findOne({ 
        where: { id: userId },
        include: { model: Profile } // Sertakan data profil pengguna
    })
    .then(user => {
        // Kirimkan data pengguna ke halaman edit profil
        res.render('editProfile', { user });
    })
    .catch(error => {
        res.status(500).send(error.message);
    });
}

static async editProfile(req, res) {
    try {
        const userId  = req.session.UserId;

        const { fullName, bio, avatarUrl, email } = req.body;

        await Profile.update({ fullName, bio, avatarUrl }, { where: { UserId: userId } });

        res.redirect('/profile');
    } catch (error) {
        res.send(error.message);
    }
}
static showNewPostForm(req, res) {
    res.render('newPostForm');
}

static async createNewPost(req, res) {
    try {
        const { title, content, imgUrl } = req.body;
        const userId = req.session.UserId;

        const newPost = await Post.create({
            title: title,
            content: content,
            imgUrl: imgUrl,
            UserId: userId 
        });

        res.redirect('/posts'); 
    } catch (error) {
        res.status(500).send(error.message);
    }
}

static async deletePost(req, res) {
    try {
        const { postId } = req.params;

        // Hapus post berdasarkan id
        await Post.destroy({ where: { id: postId } });

        res.redirect('/profile');
    } catch (error) {
        res.status(500).send(error.message);
    }
}
}

module.exports = Controller