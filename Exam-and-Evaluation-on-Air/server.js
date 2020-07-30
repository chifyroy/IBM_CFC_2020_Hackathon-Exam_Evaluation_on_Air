const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const api = require('./server/routes/api');
const analyseAnswer = require('./server/routes/analyseAnswer');
const port = 3000;
const app = express();
const cors = require('cors'); 
app.use(cors());

app.use(express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/analyse', analyseAnswer);

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.get('/index.html', function (req, res) {
    res.sendFile( __dirname + "./dist/" + "index.html" );
 })

app.listen(port, function(){
    console.log("Server is running on : " + port);
});