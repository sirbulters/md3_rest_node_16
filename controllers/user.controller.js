/**
 * Controller for user methods
 */
var User = require('mongoose').model('User'),
    config = require('../config/config');

var users = [
    {name: "Berend"},
    {name: "Hugo"},
    {name: "Ingrid"}
];

/**
 * Create JSON response with the found user (req.user)
 */
exports.read = function(req, res) {
    res.json(req.user);
};

/**
 * Create JSON response with all users
 */
exports.list = function(req, res) {

    res.json(users);

};

/**
 * Create new users
 * @param req
 * @param res
 */
exports.create = function(req, res) {

    var newUser = new User(req.body);

    newUser.save(function(err, user){
        res.json(user);
    });

    /*
     var newUser = new User(req.body);

     newUser.save(function(err) {
     if ( err ){
     return next(err);
     }

     res.json(newUser);
     });
     */
};

exports.changeName = function(req, res, next) {
    req.body.name += "je";
    next();
};

/**
 * Function to lookup a particular user and store it in the request object
 * @param req - the request object
 * @param res - our response to the request
 * @param next - the next function that needs to be executed
 * @param userID - the userID from the URL
 */
exports.getUserByID = function(req, res, next, userID) {

    /** als we mongodb gebruiken dan gaan we in deze functie de user opzoeken */

    console.log("je zoekt de user met id: " + userID);

    console.log("voor nu geef ik je een standaard object terug");
    req.user = {
        name: "Berend",
        age: 33
    };

    /** de volgende Middleware/functie mag aan de slag */
    next();

};