const model = require('../models/connection');


//get /connections: send all connections to the user
exports.index = (req, res) => {
    //res.send('send all connections to the user');
     model.find()
    .then(connections => res.render('./connection/index', { connections }))
    .catch(err => next(err));
};

//get /connections/:new: send html form for creating a new conntection

exports.new = (req, res) => {
    res.render('./connection/new');
};

//post /connections: create a new connection

exports.create = (req, res, next) => {
    // res.send('created a new connection');
    let connection = new model(req.body);//create a new connection document


    let image =  "/images/" + req.file.filename;
    connection.image = image;

    console.log(req.body);
    connection.save()//insert the document to the database
    .then((connection) => res.redirect('/connection'))
    .catch(err =>{
        if(err.name === 'ValidationError'){
            err.status = 400;
        }
        next(err);
    });
    
};

exports.show = (req, res, next) => {
    let id = req.params.id;
    //an objectID is 24-bit hex string
    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        let err = new Error('Invalid connection id' + id);
        err.status = 400;
        return next(err);   
    }
    model.findById(id)
    .then(connection =>{
        if(connection){
            return res.render('./connection/show', { connection });
        } else {
            let err = new Error('Cannot find connection with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err => next(err));
};

exports.edit = (req, res, next) => {
    let id = req.params.id;
    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        let err = new Error('Invalid connection id' + id);
        err.status = 400;
        return next(err);   
    }
    model.findById(id)
    .then(connection =>{
        if(connection){
            return res.render('./connection/edit', { connection });
        } else {
            let err = new Error('Cannot find connection with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err => next(err));
};

//put /connections/:id: update connection with id
exports.update = (req, res, next) => {
    let connection = req.body;
    let id = req.params.id;
    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        let err = new Error('Invalid connection id' + id);
        err.status = 400;
        return next(err);   
    }

    model.findByIdAndUpdate(id, connection, {useFindAndModify: false, runValidators: true})
    .then(connection=>{
        if(connection){
            return res.redirect('/connection/' + id);
        }
        else{
            let err = new Error('Cannot find connection with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=> {
        if(err.name === 'ValidationError'){
            err.status = 400;
        }
        next(err)});
};

//delete /connections/:id: delete connection with id
 exports.delete = (req, res, next) => {
    let id = req.params.id;
    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        let err = new Error('Invalid connection id' + id);
        err.status = 400;
        return next(err);   
    }
    model.findByIdAndDelete(id, {useFindAndModify: false})
    .then(connection=>{
        if(connection){
            return res.redirect('/connection');
        }
        else{
            let err = new Error('Cannot find connection with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=> next(err));
};