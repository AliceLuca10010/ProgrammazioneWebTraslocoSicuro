//Algoritmo per il calcolo del costo della prenotazione
const mongoose = require('mongoose');
const googleMapsController = require('./googleMaps');
const modelsPrenotazione = require('../models/prenotazione');
const modelloPrenotazione = modelsPrenotazione.modelloPrenotazione;
const modelsUser = require('../models/user');
const modelloUtenti = modelsUser.modelloUtenti;
const indexUser = require('../index.js');





async function calcolaPrezzo(email) {
    var prenotazione = await modelloPrenotazione.findOne({ emailUtente: email });
    var indirizzoCarico = prenotazione.viaPartenza + " " + prenotazione.cittaPartenza;
    var indirizzoScarico = prenotazione.viaArrivo + " " + prenotazione.cittaArrivo;
    var traslocatorePiuVicino = googleMapsController.getTraslocatorePiuVicino([indirizzoCarico])
    var costoDistanza;

    googleMapsController.getDistance([indirizzoCarico],
        [indirizzoScarico],
        function (distanceValue, distanceText) {

            if (distanceValue > 400) {
                if (distanceValue > 800) {
                    //maggiori di 800

                } else {
                    //tra 400 e 800

                }

            }
            else {
                //minori di 400
                console.log(traslocatorePiuVicino)
            }



            console.log(traslocatorePiuVicino)


        })

}




module.exports = { calcolaPrezzo };