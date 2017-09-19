var express = require('express');
var morgan = require('morgan');
var path = require('path');
//var pool=reqquire('pg').pool;
/*var config={
    user: 'arpitha723',
    database: 'arpitha723',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password:process.env.DB_PASSWORD
};*/
var crypto=require('crypto');
var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
function hash(input,salt)
{
    var hashed=crypto.pbkdf2Sync(input,salt,10000,512,'sho512');
    return hashed.toString('hex');
}
app.get('/hash/:input',function(req,res){
    var hashedString=hash(req.params.input,'this-is-random-string');
    res.send(hashedString);
});

/*var pool=new pool(config);
app.get('/text-db',function(req,res){
    
    pool.query('SELECT * FROM text',function(err,result){
        if (err){
            res.status(500).send(err.toString());
        }else
        {
            res.send(JSON.Stringify(reult));
        }
    });
    
});*/

app.get('/article', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'article.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/article-two', function (req, res) {
  res.send('article two server her');
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
