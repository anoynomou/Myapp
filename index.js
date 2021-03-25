var Express = require('express');



var App = Express();
var port =process.env.PORT || 4000;


App.set('view engine', 'ejs');





App.get('/',(req,res)=>{
res.send('index')

})

App.get('/Sating/:name/:email',(req,res)=>{

res.render('sating');
})

App.all('*',(req,res)=>{
res.send('Wrong path')
})

App.listen(port);