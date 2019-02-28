const express = require('express'),
      router = express.Router(), 
      Campground = require('../models/campground'),
      middleware = require('../middleware');

//======================================
//campground route 



router.get('/', (req,res) => {
    Campground.find({}, (err, allcampgrounds) => err? console.log(err) : res.render('campgrounds/index',{campVar:allcampgrounds}));
});



router.post('/',middleware.isLoggedIn,(req,res) => {
    let cName = req.body.name;
    let cPrice = req.body.price;
    let cImage = req.body.image;
    const desc = req.body.description;
    let author = {
        id:req.user._id,
        username:req.user.username
    }
    let newCampGround = {name:cName, price:cPrice, image:cImage, description:desc, author:author};
    console.log(req.user)
    
    Campground.create(newCampGround, (err, newlyCreated) => err? console.log(err) : (res.redirect('/campgrounds'), console.log(newlyCreated)));
    
});


router.get('/new',middleware.isLoggedIn,(req,res) => {
    res.render('campgrounds/new');
});



//Show - shows more info about one campground.

router.get('/:id', (req,res) => {
    Campground.findById(req.params.id).populate('comments').exec((err,foundCampground) => err || !foundCampground? (req.flash('error', 'No campground found'),
    res.redirect('/campgrounds')):
    (console.log(foundCampground), res.render('campgrounds/show', {campground:foundCampground})));
    
});

//edit route 
router.get('/:id/edit',middleware.checkCampOwnership,(req,res) => {
    Campground.findById(req.params.id, function(err,foundCampground){
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});
    
    
//campground edit 

router.put('/:id',middleware.checkCampOwnership, (req,res) => {
    Campground.findByIdAndUpdate(req.params.id,req.body.campground, (err,updatedCampground) => err? res.redirect('/campgrounds') :
    res.redirect('/campgrounds/'+req.params.id));
});



//destroy route 

router.delete('/:id',middleware.checkCampOwnership, (req,res)=> {
    Campground.findByIdAndRemove(req.params.id, (err) => err? res.redirect('/campgrounds') :
    res.redirect('/campgrounds'))
});



module.exports = router;

