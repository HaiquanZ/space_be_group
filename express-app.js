const express = require('express');
const cors  = require('cors');

const handleError = require('./api/middlewares/handle-error');
const groupController = require('./api/controllers/groupController');


module.exports = async (app) => {

    app.use(express.json());
    app.use(express.urlencoded());
    app.use(cors());
    //app.use(express.static(__dirname + '/public'))

    //api
    groupController(app);

    // error handling
    app.use(handleError);
    
}