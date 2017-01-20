/**
 * Model for users
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    name     : { type : String, default : ''},
    email    : { type : String, default : ''},
    type    : { type : String, default : 'testuser'}
});

mongoose.model('User', UserSchema);
