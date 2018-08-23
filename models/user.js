const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
var express = require("express");
var passport = require("passport");
var passportLocalMongoose = require('passport-local-mongoose');
var user = express();


var utentiSchema = new Schema({
    nome: { type: String, max: 100 , required: true},
    cognome: { type: String, max: 100, required: true },


    indirizzo: {
        via: { type: String, required: true},
        provincia: { type: String, required: true },
        stato: { type: String, required: true },
        citta: { type: String, required: true },
        cap: { type: String, required: true } 
    },
    dataNascita: { type: Date, required: true },
    telefono: { type: String, max: 100, required: true },
    email: { type: String, max: 100, required: true },
    password: { type: String, max: 100, required: true },

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


utentiSchema.methods.controllaPassword = function(passwordImmessa) {
    //TODO
    //controllaPassword dovrebbe verificare che la passwordImmessa e la password nel db (hashata) siano uguali
}



var modelloUtenti = mongoose.model('utenti', utentiSchema);

//module.exports = mongoose.model("utenti", utentiSchema);
module.exports = modelloUtenti;
//module.exports = utentiSchema;