const mongoose = require('mongoose');
const Campground = require('./models/campground');
const Comment = require('./models/comment');

var loremips = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer convallis ac lacus eget congue. Suspendisse a purus ullamcorper, sagittis sem id, iaculis sapien. Pellentesque eu arcu interdum libero elementum maximus. Duis neque orci, efficitur non dui et, maximus auctor ligula. Aliquam eros dolor, auctor mollis nunc in, maximus varius elit. Nunc tempor felis ut faucibus dapibus. Proin bibendum ac felis ac posuere. Suspendisse auctor, nisi vel viverra condimentum, lorem sem commodo nibh, eu sodales ligula neque vel felis. Suspendisse augue urna, vulputate sit amet metus vel, ultrices malesuada purus. Maecenas dapibus hendrerit odio, nec tempor ipsum sollicitudin nec. Maecenas facilisis ante vel urna ultricies, sit amet tempor orci varius. Integer vehicula, neque nec commodo vulputate, risus lorem vulputate urna, in ultricies ligula justo ac dui. Mauris at pretium eros.Pellentesque convallis tellus tempor mauris lacinia dignissim. Ut ac rhoncus neque, ultricies suscipit enim. Phasellus scelerisque, ipsum ac egestas tristique, lacus lectus posuere augue, vel facilisis risus massa ac sem. Nulla a aliquet leo, sit amet laoreet magna. Cras id leo quis neque lacinia efficitur eu pharetra lacus. Nulla euismod varius consequat. Suspendisse sapien mauris, dignissim ut magna in, dignissim pulvinar orci. Pellentesque vitae velit augue'


var data = [
    {
        name: 'cool time creeke',
        price: '5.00',
        image: 'https://cdn.shopify.com/s/files/1/2468/4011/products/campsite_1_600x.png?v=1524622915',
        description: loremips
    },
    {
        name: 'boring time creeke',
        image: 'https://i2-prod.cambridge-news.co.uk/incoming/article12958592.ece/ALTERNATES/s810/Campsites.jpg',
        description: loremips
    },
    {
        name: 'crazy time creeke',
        image: 'https://tebechtold.files.wordpress.com/2018/08/funny-camping-excited-sign.jpg',
        description: loremips
    },

];
//----------------------------------------------------------------------


const seedDB = () => {
    //removes all campgrounds
    Campground.deleteMany({}, (err) => {
        err ? console.log(err) : console.log('removed campgrounds');
        //add a few campgrounds
        data.forEach((seed) => {
            Campground.create(seed, (err, campground) => err ? console.log(err) : (console.log('added a campground'),
            //add some comments
            Comment.create({text:'this place is great', author:'Homer'}, (err,comment) => err? console.log(err) : (
                campground.comments.push(comment),
                campground.save(),
                console.log('created a new comment')
                ))));
        });
    });
};










module.exports = seedDB;





