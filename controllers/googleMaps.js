var DistanceMatrixService = require('google-distance-matrix');
DistanceMatrixService.key (process.env.GOOGLE_MAPS_API_KEY);

DistanceMatrixService.mode('driving');
DistanceMatrixService.language('it');
DistanceMatrixService.key(process.env.GOOGLE_MAPS_API_KEY);

var origins = [];
var destinations = [];

var nearestDestinationIndex;
var nearestDestination;
var traslocatore;

const modelloTraslocatori = require('../models/traslocatore').modelloTraslocatore;
const modelloUtenti = require('../models/user').modelloUtenti;

/*
The supported fields in a response are explained below.

originAddresses is an array containing the locations passed in the origins field of the Distance Matrix request.
The addresses are returned as they are formatted by the geocoder.

destinationAddresses is an array containing the locations passed in the destinations field, in the format returned by the geocoder.
rows is an array of DistanceMatrixResponseRow objects, with each row corresponding to an origin.
elements are children of rows, and correspond to a pairing of the row's origin with each destination. They contain status, duration, distance, and fare information (if available) for each origin/destination pair.

Each element contains the following fields:
status: See Status Codes for a list of possible status codes.
duration: The length of time it takes to travel this route, expressed in seconds (the value field) and as text. The textual value is formatted according to the unitSystem specified in the request (or in metric, if no preference was supplied).
duration_in_traffic: The length of time it takes to travel this route taking into account current traffic conditions, expressed in seconds (the value field) and as text. The textual value is formatted according to the unitSystem specified in the request (or in metric, if no preference was supplied). The duration_in_traffic is only returned to Google Maps APIs Premium Plan customers where traffic data is available, the mode is set to driving, and departureTime is included as part of the distanceMatrixOptions field in the request.
distance: The total distance of this route, expressed in meters (value) and as text. The textual value is formatted according to the unitSystem specified in the request (or in metric, if no preference was supplied).
fare: Contains the total fare (that is, the total ticket costs) on this route. This property is only returned for transit requests and only for transit providers where fare information is available. The information includes:
currency: An ISO 4217 currency code indicating the currency that the amount is expressed in.
value: The total fare amount, in the currency specified above.
*/

async function inizializzaOrigine(indirizzo) {
    origins.push(indirizzo);
    return origins;
}

async function inizializzaDestinazioni() {
    var traslocatori = await modelloTraslocatori.find({});
    for (i = 0; i < traslocatori.length; i++) {
        var indirizzoTraslocatore = traslocatori[i].indirizzoAzienda;
        destinations.push(indirizzoTraslocatore); //+ ", " + stato);
    }
    return destinations;
    /*for (i=0; i<listaIndirizzi.length; i++) {
        destinations.push(listaIndirizzi);
    }*/
}

function getTraslocatorePiuVicino(origins, destinations, callback) {
    DistanceMatrixService.matrix(origins, destinations, async function (err, distances) {
        if (err) {
            return console.log(err);
        }
        if (!distances) {
            return console.log('no distances');
        }
        //Se la risposta è corretta
        if (distances.status == 'OK') {
            //imposto una variabile a infinito
            var min = Infinity;
            //i -> indice per l'array delle origini (si trovano in rows)
            for (var i = 0; i < origins.length; i++) {
                //j -> indice per l'array delle destinazioni (si trovano in elements)
                for (var j = 0; j < destinations.length; j++) {
                    //mi salvo l'origin e la destination
                    var origin = distances.origin_addresses[i];
                    var destination = distances.destination_addresses[j];
                    //se il calcolo è avvenuto correttamente
                    if (distances.rows[i].elements[j].status == 'OK') {
                        //mi salvo il valore della distanza (intero)
                        var distanceValue = distances.rows[i].elements[j].distance.value;
                        //mi salvo il testo della distanza (es. 10,8 km)
                        var distanceText = distances.rows[i].elements[j].distance.text;
                        //console.log('Distance from ' + origin + ' to ' + destination + ' is ' + distanceText); //5,...
                        //controllo se distanceValue è minore o uguale di min
                        if (distanceValue <= min) {
                            //distanceValue diventa il nuovo min
                            min = distanceValue;
                            //mi salvo il valore di j
                            nearestDestinationIndex = j;
                        }
                    } else {
                        //se il calcolo della distanza non è stato possibile stampo messaggio di errore
                        console.log(destination + ' is not reachable by land from ' + origin);
                    }
                }
            }
            //alla fine dei for ho il valore della distanza minimo e quindi la destinazione più vicina
            nearestDestination = destinations[nearestDestinationIndex];
            traslocatore = await modelloTraslocatori.findOne({ indirizzoAzienda: nearestDestination });
            callback(traslocatore, distanceValue, distanceText);
        } else {
            console.log("ERRORE");
            return;
        }
    });
};

function getDistance(origins, destinations, callback) {
    DistanceMatrixService.matrix(origins, destinations, async function (err, distances) {
        if (err) {
            return console.log(err);
        }
        if (!distances) {
            return console.log('no distances');
        }
        //Se la risposta è corretta
        if (distances.status == 'OK') {
            //imposto una variabile a infinito
            var min = Infinity;
            //i -> indice per l'array delle origini (si trovano in rows)
            for (var i = 0; i < origins.length; i++) {
                //j -> indice per l'array delle destinazioni (si trovano in elements)
                for (var j = 0; j < destinations.length; j++) {
                    //mi salvo l'origin e la destination
                    var origin = distances.origin_addresses[i];
                    var destination = distances.destination_addresses[j];
                    //se il calcolo è avvenuto correttamente
                    if (distances.rows[i].elements[j].status == 'OK') {
                        //mi salvo il valore della distanza (intero)
                        var distanceValue = distances.rows[i].elements[j].distance.value;
                        //mi salvo il testo della distanza (es. 10,8 km)
                        var distanceText = distances.rows[i].elements[j].distance.text;
                        //console.log('Distance from ' + origin + ' to ' + destination + ' is ' + distanceText); //5,...
                        if(distanceValue <= min){
                            min = distanceValue;
                            nearestDestination = j;

                        }


                    } else {
                        //se il calcolo della distanza non è stato possibile stampo messaggio di errore
                        console.log(destination + ' is not reachable by land from ' + origin);
                    }
                }
            }
            //alla fine dei for ho il valore della distanza minimo e quindi la destinazione più vicina
            callback(distanceValue, distanceText);
        } else {
            console.log("ERRORE");
        }
    });
}

module.exports = {
    getTraslocatorePiuVicino, //prende come input l'indirizzo di origine e restituisce il traslocatore più vicino
    getDistance,
     //prende come input l'indirizzo di partenza e quello di arrivo (sotto forma di array)
    //e restituisce la distanza tra i due (distanceValue (int), distanceText (string -> es. 199 km))
}