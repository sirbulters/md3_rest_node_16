/**
 * Controller for user methods
 */
var User = require('mongoose').model('User'),
    config = require('../config/config');

/**
 * Send the current found user as JSON
 */
exports.read = function(req, res) {
    res.json(req.md3.user);
};

/**
 * Function for finding all users
 */
exports.list = function(req, res) {

    User.find({}, { _id : 0, email : 0 }, function(err, users) {
        return res.json(users);
    });

};

/**
 * Create new users
 * @param req
 * @param res
 */
exports.create = function(req, res) {

    var newUser = new User(req.body);

    newUser.save(function(err, user) {
        if ( err ){
            return next(err);
        }

        res.json(user);
    });
};

/**
 * Test middleware for adding 'je' as a suffix for a new user
 * @param req
 * @param res
 * @param next
 */
exports.changeName = function(req, res, next) {
    req.body.name += "je";
    next();
};

/**
 * Delete a specific user
 * @param req
 * @param res
 * @param next
 */
exports.delete = function(req, res, next) {
    req.md3.user.remove(function(err) {
        if ( err ){
            return next(err);
        }

        res.json(req.md3.user);
    })
};

/**
 * Update an user based on the found user
 * @param req
 * @param res
 * @param next
 */
exports.update = function(req, res, next) {
    User.findByIdAndUpdate(req.md3.user._id,
                           { $set : req.body },
                           { new : true },
                           function(err, user) {
                               if ( err ){
                                   return next(err);
                               }
                               res.json(user);
                           });
};

/**
 * Function to lookup a particular user and store it in the request object
 * @param req - the request object
 * @param res - our response to the request
 * @param next - the next function that needs to be executed
 * @param userID - the userID from the URL
 */
exports.getUserByID = function(req, res, next, userID) {

    User.findOne({ _id : userID }, function(err, user) {
        req.md3.user = user;

        /** de volgende Middleware/functie mag aan de slag */
        next();
    });

};