const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

var utentiSchema = new Schema({
    nome: { type: String, max: 100, required: true },
    cognome: { type: String, max: 100, required: true },
    indirizzo: {type: String, required: true },
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

var modelloUtenti = mongoose.model('utenti', utentiSchema, 'utenti');


module.exports = modelloUtenti;