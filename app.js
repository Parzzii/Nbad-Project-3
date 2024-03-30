//require modules
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const connectionRoutes = require('./routes/connectionRoutes');
const aboutRoutes = require('./routes/aboutRoutes');
const contactRoutes = require('./routes/contactRoutes');
const {fileUpload} = require('./middleware/fileUpload')
const mongoose = require('mongoose');



//create app
const app = express();

//configure app
let port = 5000;
let host = 'localhost';

app.set('view engine', 'ejs');

//connect to MongoDB
mongoose.connect('mongodb+srv://rhedaoo:b8FLsNsXNwl6MIZz@cluster0.hzf98x6.mongodb.net/',
                     {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    //start the server
    app.listen(port, host, () => {
    console.log(`Server is running on port`, port);
});
})
.catch(err => console.log(err.message));


// mount middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));
app.use(methodOverride('_method'));

//set up routes

app.use('/about', aboutRoutes);

app.use('/contact', contactRoutes);

app.get('/', (req, res) => {
    res.render('index');
});
app.get('/index', (req, res) => {
    res.redirect('/');
});

app.use('/connection', connectionRoutes);


app.post('/', fileUpload, (req, res, next) => {
    let image = "./images/" + req.file.filename;
    res.render('/connection/show', {image});
});

app.use((req, res, next) => {
    let err = new Error('The server cannot locate ' + req.url);
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    console.log(err.stack);
    if(!err.status){
        err.status = 500;
        err.message = 'Internal Server Error';
    }
    res.status(err.status);
    res.render('error', {error: err}); 
});

