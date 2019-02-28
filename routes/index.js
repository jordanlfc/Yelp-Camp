const express = require('express'),
      router = express.Router(),
      Campground = require('../models/campground'),
      flash = require('connect-flash'),
      Comment = require('../models/comment'),
      passport = require('passport'),
      User = require('../models/user'),
      middleware = require('../middleware');
      
      
const authenticator = (passport.authenticate('local', {
        successRedirect:'/campgrounds',
        failureRedirect:'/login'
}));



//root route ==================

router.get('/', (req, res) => {
    res.render('landing');
});

// =============================


router.get('/register', (req,res) => res.render('register'));

// handle sign up logic


// router.post('/register', (req,res) => {
//     const newUser = new User({username:req.body.username});
//     const password = req.body.password;
//     User.register(newUser,password, (err, user) => {
//       err? (console.log(err), res.render('register')) : passport.authenticate('local',res.redirect('/campgrounds'));
//     })
// });

router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash('error', err.message)
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
           req.flash('success', `Welcome to YelpCamp ${user.username}`)
           res.redirect("/campgrounds"); 
        });
    });
});

//show login form 

router.get('/login',(req, res) => {
    res.render('login');
    
});





router.get('/login', function(req,res){
    res.render('login');
})


// handle login logic
    

router.post('/login', authenticator ,(req,res) => {
});
//log out route
router.get('/logout', (req,res) => (req.logout(), req.flash('success','Logged Out') ,res.redirect('/campgrounds')));

module.exports = router;





