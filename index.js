const express = require('express')
// const fetch = require('node-fetch')
const cool = require('cool-ascii-faces')
const path = require('path')
const PORT = process.env.PORT || 5000


var app = express()
var userRouter = require('./routes/user')
//public is where we keep css files (stylesheets)
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
//allows to find files without views (pages/index) vs (views/pages/index)
app.set('views', path.join(__dirname, 'views'))

app.set('view engine', 'ejs')

//res.render to load ejs view files


//create url endpoints
// app.get('/', function(req,res) {
//   res.render('pages/index')
// })

//remove this function for testing endpoints
// app.get('/cool', function(req, res){
//   res.send(cool())
// })

app.use('/',userRouter)

// app.use(function(req, res, next){
//   res.locals.message = err.message
//   res.locals.error = req.app.get('env') === 'development' ? err : {}

//   // render the error page
//   res.status(err.status || 500)
//   res.render('pages/error')
// })

app.listen(PORT, function(){
  console.log(`Listening on ${PORT}`)
})

