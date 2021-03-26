var Express = require('express');
var path = require('path')
var App = Express();
var port =process.env.PORT || 4000;

const cors = require('cors');

var Cryptojs = require('crypto-js');


// Atomaticly Allow CROS req

App.use(cors({ origin: true }));


// firebase 
var Firebase = require('firebase');



  var firebaseConfig = {
    apiKey: "AIzaSyAathl2tVYykHsvnkCq7XwBQRkUIvIq2Oo",
    authDomain: "mysckendapp.firebaseapp.com",
    databaseURL: "https://mysckendapp-default-rtdb.firebaseio.com",
    projectId: "mysckendapp",
    storageBucket: "mysckendapp.appspot.com",
    messagingSenderId: "799254964254",
    appId: "1:799254964254:web:0a79fbe6405e9d6d29660f"
  };


Firebase.default.initializeApp(firebaseConfig);


async function Emailvarifiyer(name,email){
var result = ''
await Firebase.default.database().ref(`Acount/${name}/useremail`).once('value',Snapshot=>{
if(Snapshot.val() === String(email)){

result = true
}
else{

result = false;
};

})
return result
}


///Crypto functions


function EncriptorOrdecriptor(data ='',key,mode = 'encrypt'){
var result = ''
if(mode === 'encrypt'){
var encrypted = Cryptojs.AES.encrypt(data,key);
encrypted =  String(encrypted);
for(let i =0;i < encrypted.length;i++){
if(encrypted[i] === '/'){
result = result + '℗'
}else{result = result + encrypted[i]}

}
}else{
var prepair = ''
for(let i = 0;i < data.length;i++){
if(data[i] === '℗'){
prepair = prepair + '/'
}else{prepair = prepair + data[i]}
}
var decr = Cryptojs.AES.decrypt(prepair, key);
decr = decr.toString(Cryptojs.enc.Utf8);
result = decr

}
return result
}


//Data & Email Procacing//
App.get('/Emailvarifier/:name/:email',(req,res)=>{

var name =EncriptorOrdecriptor(req.params.name,'pasta','dec');
var email = EncriptorOrdecriptor(req.params.email,'pasta','dec');
Emailvarifiyer(name,email).then((val)=>{
if(val === true){
res.sendStatus(200);
}else{
res.sendStatus(404);

}

})

})

async function ChangeFirepass(name,pass){


await Firebase .default.database().ref(`Acount/${name}`).update({password:pass})

}


async function ChangemyPassword(name,newpass){

await fetch(`/Passchange/${name}/${newpass}`).catch((err)=>{console.log(err)})

}



function ScreenSating(name,func){
return(
`





<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dolphino</title>
    <link rel="icon" href="https://i.pinimg.com/736x/38/a8/bd/38a8bd3398a1a0ca0c790ac66df695ed.jpg">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.0.0/crypto-js.min.js" integrity="sha512-nOQuvD9nKirvxDdvQ9OMqe2dgapbPB7vYAMrzJihw5m+aNcf0dX53m6YxM4LgA9u8e9eg9QX+/+mPu8kCNpV2A==" crossorigin="anonymous"></script>
    <style>

    *{margin: 0px;padding: 0px;}
   </style>
</head>
<body>
<div style="width: 100%;height: 100%">

<div style="margin: auto;background-color: rgb(65, 211, 126);width: 90%;height: 40%;border-radius: 10px;display: flex;flex-direction: column;margin-top: 40%;">
<text style="align-self: center;font-size: 19px;margin-top: 5%;">Change Password</text>
<input id="password" style="width: 80%;align-self: center;height: 35px;border-radius: 8px;margin-top: 17%;margin-bottom: 20px;" placeholder="Enter your new Password" >

<button style="align-self: center;width: 60px;height: 35px;color: rgb(218, 209, 97);border-radius: 10px;" onclick="ChangePass()" >
SAVE
</button>

</div>

</div>
<script>

function EncriptorOrdecriptor(data ='',key,mode = 'encrypt'){
var result = ''
if(mode === 'encrypt'){
var encrypted = CryptoJS.AES.encrypt(data,key);
encrypted =  String(encrypted);
for(let i =0;i < encrypted.length;i++){
if(encrypted[i] === '/'){
result = result + '℗'
}else{result = result + encrypted[i]}

}
}else{
var prepair = ''
for(let i = 0;i < data.length;i++){
if(data[i] === '℗'){
prepair = prepair + '/'
}else{prepair = prepair + data[i]}
}
var decr = CryptoJS.AES.decrypt(prepair, key);
decr = decr.toString(CryptoJS.enc.Utf8);
result = decr

}
return result
}


function Rop(func,name,newpass){
if(func && name && newpass){
var Name = EncriptorOrdecriptor(name,'pasta');
var Pass = EncriptorOrdecriptor(newpass,'pasta')
func(Name,Pass);
}else{console.log("empty")}

}


async function ChangePass(){
var UserInput = document.getElementById('password').value;
console.log("${name}");
Rop(${func},"${name}",UserInput)
}

</script>
</body>
</html>




`)

}

//res.sendFile(path.join(__dirname+'/Html'+'/sating.html'))

App.get('/',(req,res)=>{
res.sendFile(path.join(__dirname+'/Html'+'/index.html'))
});

App.get('/sating/:name',(req,res)=>{

var Name = EncriptorOrdecriptor(req.params.name,'pasta','dec')
res.send(ScreenSating(Name,ChangemyPassword))
});

App.get('/Passchange/:name/:newpass',(req,res)=>{
var Name = EncriptorOrdecriptor(req.params.name,'pasta','dec');
var Pass = EncriptorOrdecriptor(req.params.newpass,'pasta','dec');

ChangeFirepass(Name,Pass);


})



App.all('*',(req,res)=>{
res.send('Wrong path')
});

App.listen(port);