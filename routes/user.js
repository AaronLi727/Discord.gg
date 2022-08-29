var express = require('express')
const transapi = require('../lib/transapi')
var router = express.Router()


router.get('/', function(req, res, next) {

    id = req.query.userid

    transapi.getAllData(id)
        .then(async function(i) {
            res.render('pages/user', {
                stats: i.stats,
                id: i.id,
                username: i.username,
                discriminator: i.discriminator,
                avatar: i.avatar,
                banner: i.banner,
                bannercolor: i.bannercolor,
                badge: i.badge,
                date: i.date
            })
        })
        .catch(function(error){
            // console.log('Not a valid user')
            res.render('pages/user')
        })
    
})



module.exports = router