const express = require('express'),
      router = express.Router({mergeParams:true}),
      Campground = require('../models/campground'),
      Comment = require('../models/comment'),
      middleware = require('../middleware')
      
      
//==============================================================

//======================================================
//new comments route

router.get('/new', middleware.isLoggedIn, (req,res)=> {
    Campground.findById(req.params.id, (err, campground) => err? console.log(err) : 
    res.render('comments/new', {campground:campground}));
});


router.post('/', middleware.isLoggedIn , (req,res) => {
    Campground.findById(req.params.id, (err,campground) => err? (console.log(err), res.redirect('campgrounds')) : 
    (Comment.create(req.body.comment, (err,comment) => err? console.log(err) : 
    (comment.author.id = req.user._id,comment.author.username = req.user.username, comment.save(), 
    campground.comments.push(comment), 
    campground.save(), req.flash('success', 'Added Comment')
    ,res.redirect('/campgrounds/'+campground._id)))))
});

//===========================================================


//edit comment 
router.get('/:comments_id/edit',middleware.checkCommentOwnership,(req,res) => {
    Comment.findById(req.params.comments_id,(err,foundComment) => err? res.redirect('back') : 
    res.render('comments/editcom', {campground_id:req.params.id, comment:foundComment}))
});


//edit comment put request 

router.put('/:comments_id',middleware.checkCommentOwnership,(req,res) => {
    Comment.findByIdAndUpdate(req.params.comments_id,req.body.comment, (err,updatedComment) => err? res.redirect('back') : 
    res.redirect('/campgrounds/'+req.params.id));
    
});





//destroy route 

// router.delete('/:comments_id',middleware.checkCommentOwnership, (req,res) => {
//     Comment.findByIdAndRemove(req.params.comments_id, (err) => err? res.redirect('back') : (req.flash('success', 'comment deleted'),res.redirect('/campgrounds/' + req.params.id)))
// });



router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    //findByIdAndRemove
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
       if(err){
           res.redirect("back");
       } else {
           req.flash("success", "Comment deleted");
           res.redirect("/campgrounds/" + req.params.id);
       }
    });
});







module.exports = router;