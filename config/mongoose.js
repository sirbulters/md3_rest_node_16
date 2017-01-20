/**
 * Configuration for Mongoose + setting up connection
 */
var config = require('./config'),
    mongoose = require('mongoose');

module.exports = function() {
    var db = mongoose.connect(config.db);

    // load the DB schema's
    require('../models/user.model');

    return db;
};
