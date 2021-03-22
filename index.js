var Express = require('express');
var app = Express();
var port = process.env.PORT || 8000;
var http = require('http').createServer(app).listen(port);
var Firebase = require('firebase')
var CryptoJS = require("crypto-js");

// FIREBASE CONFIG
  var firebaseConfig = {
    apiKey: "AIzaSyAathl2tVYykHsvnkCq7XwBQRkUIvIq2Oo",
    authDomain: "mysckendapp.firebaseapp.com",
    databaseURL: "https://mysckendapp-default-rtdb.firebaseio.com",
    projectId: "mysckendapp",
    storageBucket: "mysckendapp.appspot.com",
    messagingSenderId: "799254964254",
    appId: "1:799254964254:web:0a79fbe6405e9d6d29660f"
  };
///INICLIZE APP
Firebase.initializeApp(firebaseConfig);





async function Varify(name,email){

if(name,email){
console.log(name+email)
var result = '';
await Firebase.database().ref("Acount/"+name+"/useremail").once('value',Snapshot=>{

if (Snapshot.val() === email){
result = true
}else{result = false}

});


return result;

}
};

async function SavePass(name,password){

await Firebase.database().ref("Acount/"+name).update({password:password})
}








 /*
// Encrypt
var ciphertext = CryptoJS.AES.encrypt('my message', 'secret key 123').toString();

console.log(ciphertext)
// Decrypt
var bytes  = CryptoJS.AES.decrypt(ciphertext, 'secret key 123');
var originalText = bytes.toString(CryptoJS.enc.Utf8);
 
console.log(originalText); // 'my mess

*/


app.set('view engine', 'ejs')
app.get('/', (req, res) => {
  res.render('index.ejs');
});


app.get('/Password/:password/:name',(req,res)=>{
var Name = req.params.name;
var Password = req.params.password;

SavePass(Name,Password);
res.send('ok')
})


function DEcriptor(data,secretkey){
var ciphertext = CryptoJS.AES.decrypt(data,secretkey);
var originalText = ciphertext.toString(CryptoJS.enc.Utf8);
return originalText;
};

function Incriptor(data,secretkey){



var ciphertext = CryptoJS.AES.encrypt(data,secretkey).toString();
return ciphertext;
};


app.get('/Varify/:NAME/:EMAIL',(req,res)=>{

var Name = req.params.NAME;
var Email = req.params.EMAIL;


if(Name,Email){

Varify(Name,Email).then(val=>{

if(val === true){
res.sendStatus(200);

}else{res.sendStatus(404)}



}).catch((err)=>{console.log(err)})



}

})
   


function Parcer(data = ''){
io = ''

for (let i = 0;i<data.length;i++){

if(i === 0 && data[i] === '&'){
null
}else if(i === 1 && data[i] === '='){
null
}else if(data[i] === '℗'){
io = io + '/'
}

else{io = io + data[i]}

}


return io
};





app.get('/sating/Passchange/:name', (req, res) => {
  var data = req.params.name.toString();

console.log(Parcer(data));
  var UIP=DEcriptor(Parcer(data),'pasta')
  res.render('sating.ejs',{name:UIP})


});


