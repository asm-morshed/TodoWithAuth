// const http = require('http');

// const port = 3000;

// const server = http.createServer((req, res) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     res.end('<h1>Hello World</h1>');
// })

// server.listen(port, () => {
//     console.log(`Server is running on port ${port}`);

// })

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
const path = require('path');

app.use(cors());
app.use(passport.initialize());
require('./config/passport')(passport)

const Todo = require('./routes/Todo');
const User = require('./routes/User');
const Config = require('./config/db');



//Connecting to Database
mongoose.connect(Config.dbUrl)
    .then(res => {
        console.log("Database is connected");

    }).catch(error => {
        console.log("Error during connecting Database");

    })

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
const port = process.env.PORT || 5000;



// app.get('/api/todo', (req, res) => {
//     res.send("Here all your task")
// })
app.use('/api/todo', Todo);
app.use('/api/user', User);

// Server static page in production
if (process.env.NODE_ENV === 'production') {

    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);

})
