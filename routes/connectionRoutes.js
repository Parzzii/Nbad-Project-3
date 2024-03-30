const express = require('express');
const controller=require('../controllers/connectionController');
const {fileUpload} = require('../middleware/fileUpload');

const router = express.Router();

//get /connections: send all connections to the user

router.get('/', controller.index);

//get /connections/:new: send html form for creating a new conntection

router.get('/new', controller.new);

//post /connections: create a new connection

router.post('/', fileUpload, controller.create);

//get /connections/:id: send details of connection with id
router.get('/:id', controller.show);

//get /connections/:id/edit: send html form for editing connection with id
router.get('/:id/edit', controller.edit);

//put /connections/:id: update connection with id
router.put('/:id', controller.update); 

//delete /connections/:id: delete connection with id
router.delete('/:id', controller.delete);

module.exports = router;