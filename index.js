var Express = require('express');

var path = require('path')

var App = Express();
var port =process.env.PORT || 4000;





App.get('/',(req,res)=>{
res.sendFile(path.join(__dirname+'/Html'+'/index.html'))
});

App.get('/sating',(req,res)=>{
res.sendFile(path.join(__dirname+'/Html'+'/sating.html'))
});


App.all('*',(req,res)=>{
res.send('Wrong path')
});

App.listen(port);