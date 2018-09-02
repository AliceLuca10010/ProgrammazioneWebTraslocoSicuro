const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ModelloTraslocatore = require('./traslocatore');


var prenotazioneSchema = new Schema({
    emailUtente:{ type :String, required : true},
    viaPartenza: { type: String, required: true },
    numeroCivicoPartenza: { type: Number, required: true },
    capPartenza: {type: Number, required: true},
    cittaPartenza : {type: String, required: true},
    provinciaPartenza : {type: String, required: true},
    statoPartenza : {type: String, required: true},
    ascensorePartenza : {type: String, required: true},
    pianoPartenza : {type: Number, required: true},
    viaArrivo: { type: String, required: true },
    numeroCivicoArrivo: { type: Number, required: true },
    capArrivo: {type: Number, required: true},
    cittaArrivo : {type: String, required: true},
    provinciaArrivo : {type: String, required: true},
    statoArrivo : {type: String, required: true},
    ascensoreArrivo :{type: String, required:true},
    pianoArrivo : {type: Number, required: true},
    stanze : {type: mongoose.Schema.Types.Mixed , required:true},
    imballaggio :{type: String, required: true},
    smontaggioRiassemblaggio : {type: String, required: true},
    depositoMerci : {type: String, required: true},
    costoTotale : {type: Number, required: true},
    traslocatore : {type: ModelloTraslocatore , required:true}
});

var modelloPrenotazione = mongoose.model('prenotazione', prenotazioneSchema, 'prenotazione');


module.exports = modelloPrenotazione;