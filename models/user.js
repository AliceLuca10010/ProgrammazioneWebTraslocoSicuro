const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
var express = require("express");
var passport = require("passport");
var passportLocalMongoose = require('passport-local-mongoose');
var user = express();


var utentiSchema = new Schema({
    nome: { type: String, required: true, max: 100 },
    cognome: { type: String, required: true, max: 100 },


    indirizzo: {
        via: { type: String, required: true },
        provincia: { type: String, required: true },
        stato: { type: String, required: true },
        citta: { type: String, required: true },
        cap: { type: String, required: true } 
    },
    dataNascita: { type: Date, required: true },
    telefono: { type: String, required: true, max: 100 },
    email: { type: String, required: true, max: 100 },
    password: { type: String, required: true, max: 100 },

});

//prima di salvare i dati nel database crypto la password
utentiSchema.pre('save', function(next) {
    var newUser = this;
    bcrypt.hash(newUser.password, 10, function(err, hash) {
        if (err) {
            return next(err);
        }
        newUser.password = hash;
        next();
    })
});

/*
UtentiSchema.statics.authenticate = function(email, password, callback) {
    utentis.findOne({ email: email })
        .exec(function(err, utentis) {
            if (err) {
                return callback(err)
            } else if (!utentis) {
                var err = new Error('User not found.');
                err.status = 401;
                return callback(err);
            }
            bcrypt.compare(password, user.password, function(err, result) {
                if (result === true) {
                    return callback(null, user);
                } else {
                    return callback();
                }
            })
        });
}
*/

utentiSchema.methods.controllaPassword = function(passwordImmessa) {
    //TODO
    //controllaPassword dovrebbe verificare che la passwordImmessa e la password nel db (hashata) siano uguali
}


user.use(passport.initialize());
user.use(passport.session());







utentiSchema.plugin(passportLocalMongoose);
var modelloUtenti = mongoose.model('utenti', utentiSchema);

module.exports = mongoose.model("utenti", utentiSchema);
module.exports = modelloUtenti;
module.exports = utentiSchema;