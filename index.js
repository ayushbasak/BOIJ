const express = require('express');
const consumer = require('./services/consumer');
const app = express();
const ejs = require('ejs');
const bodyParser = require('body-parser');
const { response } = require('express');
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
    .post(async (req,res)=>{
        console.log(req.body);
        await consumer.insert(req.body).then(response => text = response).catch((e)=> {console.log(e); text = {}});
        text = 
        `
            <link rel="stylesheet" href='/index.css'>
            <div class = "main">
                <h1>Account Information: </h1>
                <h5>Note: All information shown here will not be shown ever again! so write it down somewhere</h5>
                <div class = "box">
                    <p>
                        Name: ${text.currName} <br>
                        Consumer ID : ${text.currConsumerId} <br>
                        Account Number: ${text.currAccountNo} <br>
                        Account PIN: ${text.currPIN} <br>
                        <form method = "GET" action = "/home">
                            <button type = "submit">Back To Home</button>
                        </form>
                    </p>
                </div>
            </div>
        `
        res.send(text);
        // res.redirect('/home');
    })

app.route('/signin')
    .get((req,res)=>{
        res.sendFile('/components/signin.html', {root: __dirname})
    })
    .post(async (req,res)=>{
        console.log(req.body);
        await consumer
                .access(req.body.accountNumber, req.body.pin)
                .then(response => val = response)
                .catch((err)=> val = 'Invalid Details');
        res.send(val);
    })


//Account Open
app.use('/account/:id', (req,res)=>{
    res.send("This is the id : " + req.params.id);
})

// Get DATA
app.route('/data')
    .get(async (req,res)=>{
        await consumer.details().then(response => val = response)
        res.send(val);
    })