var express = require('express')
const transapi = require('../lib/transapi')
var router = express.Router()


//make this request render a page with search bar
router.get('/', function(req, res, next) {
    // res.render('pages/search', {
    //     id: 'None'
    // })
    // console.log(req.query.id)
    // console.log(req.params.id)
    
    // console.log(req.query.id)
    // if (Object.keys(req.query).length === 0) {
    //     userid = '476261769849864192'
    // } else {
    //     userid = req.query.userid
    // }
    // console.log(userid)
    // console.log('this')
  
    
    // console.log(req.params.userid)
    // transapi.getAllData(id)
    //     .then(async function(i) {
    //         res.render('pages/form', {
    //             id: i.id,
    //             username: i.username,
    //             avatar: i.avatar
    //         })
    //     })
    // console.log(transapi.)
    // console.log(res.data(transapi.getUserInfo(req.query.userid)))
    if (Object.keys(req.query).length === 0){
        console.log('You need to specify a user')
        res.render('pages/search')
    }else{
        id = req.query.userid
        transapi.getAllData(id)
            .then(async function (i) {
                res.render('pages/user', {
                    id: i.id,
                    username: i.username,
                    discriminator: i.discriminator,
                    avatar: i.avatar,
                    banner: i.banner,
                    bancolor: i.bancolor,
                    accent: i.accent,
                    badge: i.badge,
                    date: i.date
                })
            })
            .catch(function(error){
                console.log('Unknown User, Try Again')
                res.render('pages/search')
            })
        //maybe send data to router below 
    }
    
    // res.send(transapi.getUserInfo(input))
   
    // console.log(id)
})


//router that displays the results with data from transapi
//url example: http://localhost:5000/search/?id=3
//req.query.id = 3
// router.get('/user/:userid', function(req, res, next){
//     id = req.query.userid
//     transapi.getAllData(id)
//         .then(async function (i) {
//             res.render('pages/search', {
//                 id: i.id,
//                 username: i.username,
//                 avatar: i.avatar
//             })
//         })
// })




//possible response 
// {
//     "id": "123456789012345678",
//         "username": "some username",
//             "avatar": null,
//                 "discriminator": "1234",
//                     "public_flags": 0,
//                         "banner": null,
//                             "banner_color": null,
//                                 "accent_color": null
// }

module.exports = router