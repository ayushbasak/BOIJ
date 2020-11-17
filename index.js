const express = require('express');
const consumer = require('./services/data');
const app = express();
const bodyParser = require('body-parser')
const PORT = 5000 | process.env.PORT;

consumer.authenticate();

app.use(bodyParser.urlencoded({extended: true}))

app.listen(PORT, ()=>{
    console.log(`Server listening at PORT : ${PORT}`);
});
app.use(express.static(__dirname + "/components/"));
app.route('/home')
    .get((req,res)=>{
        res.sendFile('components/index.html', {root: __dirname});
    })

app.route('/signup')
    .get((req,res)=>{
        res.sendFile('/components/signup.html', {root: __dirname});
    })
    .post((req,res)=>{
        console.log(req.body);
        consumer.insert(req.body)
        res.send('Inserted Details!');
    })

app.route('/signin')
    .get((req,res)=>{
        res.sendFile('/components/signin.html', {root: __dirname})
    })
    .post((req,res)=>{
        console.log(req.body);
        res.send('Got Details!');
    })