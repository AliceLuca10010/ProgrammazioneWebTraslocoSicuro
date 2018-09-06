const ModelloPrenotazione = require('../models/prenotazione');

module.exports = {
    calcolaPrezzo: function (traslocatore, distanceValue, DatiPrenotazione) {
        var costoDistanza;
        //salvo il costo della giusta distanza in costoDistanza. il costo sarà diverso in base alle fasce di km
        if ((distanceValue / 1000) > 400) {
            if ((distanceValue / 1000) > 800) {
                //maggiore 800
                costoDistanza = traslocatore.costoDistanza.sopra800km;

            } else {
                //tra 400 e 800
                costoDistanza = traslocatore.costoDistanza.tra400e800km;

            }

        } else {

            costoDistanza = traslocatore.costoDistanza.minore400km;
            //minore 400
        }
        var costoDifficolta;

        //calcolo il costo della difficoltà in base alla posizione dell'abitazione. il costo sarà diverso se l'abitazione
        //si trova al piano terra, se ha l'ascensore e in caso negativo il costo sarà diverso in base al piano.
        //controllo qual è il caso specifico per l'abitazione di carico e poi quella di scarico e per entrambe
        //aggiungo il costo specifico in costoDifficolta

        if (DatiPrenotazione.ascensorePartenza === "true") {
            costoDifficolta = traslocatore.costoDifficolta.ascensore;

        } else {
            if (DatiPrenotazione.pianoPartenza === 0) {
                costoDifficolta = traslocatore.costoDifficolta.pianoterra;
            }
            else {
                if (DatiPrenotazione.pianoPartenza === 1 || DatiPrenotazione.pianoPartenza === 2) {
                    costoDifficolta = traslocatore.costoDifficolta.senzaAscensorePrimiPiani;
                }
                else {
                    costoDifficolta = traslocatore.costoDifficolta.senzaAscensoreUltimiPiani;
                }

            }
        }

        if (DatiPrenotazione.ascensoreArrivo === "true") {
            costoDifficolta += traslocatore.costoDifficolta.ascensore;

        } else {
            if (DatiPrenotazione.pianoArrivo === 0) {
                costoDifficolta += traslocatore.costoDifficolta.pianoterra;
            }
            else {
                if (DatiPrenotazione.pianoArrivo === 1 || DatiPrenotazione.pianoArrivo === 2) {
                    costoDifficolta += traslocatore.costoDifficolta.senzaAscensorePrimiPiani;
                }
                else {
                    costoDifficolta += traslocatore.costoDifficolta.senzaAscensoreUltimiPiani;
                }

            }
        }
        var costoDeposito;
        //calcolo il costo del depositoMerci se questo servizio viene scelto. Il costo dipende dal numero di stanze.

        if (DatiPrenotazione.depositoMerci === "true") {
            costoDeposito = DatiPrenotazione.stanze.length * 2.5 * traslocatore.costoDepositoMerci;

        }
        else { //se il deposito merci non è stato scelto come servizio
            costoDeposito = 0;
        }
        //in base alle stanze scelte sommo i costi del traslocatore al costoBase

        var costoBase = 0;

        for (var i = 0; i < DatiPrenotazione.stanze.length; i++) {

            switch (DatiPrenotazione.stanze[i]) {

                case "cucina":
                    costoBase += traslocatore.costiBaseStanze.cucina;
                    break;

                case "cameretta":
                    costoBase += traslocatore.costiBaseStanze.camera;
                    break;
                case "cameretta2":
                    costoBase += traslocatore.costiBaseStanze.camera;
                    break;

                case "salone":
                    costoBase += traslocatore.costiBaseStanze.salone;

                    break;
                case "salone2":
                    costoBase += traslocatore.costiBaseStanze.salone;

                    break;

                case "salaDaPranzo":
                    costoBase += traslocatore.costiBaseStanze.salaDaPranzo;
                    break;

                case "camera":
                    costoBase += traslocatore.costiBaseStanze.camera;
                    break;
                case "camera2":
                    costoBase += traslocatore.costiBaseStanze.camera;
                    break;

                case "bagno":
                    costoBase += traslocatore.costiBaseStanze.bagno;
                    break;
                case "bagno2":
                    costoBase += traslocatore.costiBaseStanze.bagno;
                    break;

                case "ingresso":
                    costoBase += traslocatore.costiBaseStanze.ingresso;
                    break;

                case "studio":
                    costoBase += traslocatore.costiBaseStanze.studio;
                    break;

                case "balcone":
                    costoBase += traslocatore.costiBaseStanze.balcone;
                    break;

                case "soffitta":
                    costoBase += traslocatore.costiBaseStanze.soffitta;
                    break;

                case "giardino":
                    costoBase += traslocatore.costiBaseStanze.giardino;
                    break;

                case "boxGarage":
                    costoBase += traslocatore.costiBaseStanze.boxGarage;

                    break;

                case "ripostiglio":
                    costoBase += traslocatore.costiBaseStanze.ripostiglio;
                    break;

                case "cantina":
                    costoBase += traslocatore.costiBaseStanze.cantina;
                    break;

            }
        }
        //in base alle stanze scelte sommo i costi del traslocatore al costoImballaggio
        var costoImballaggio = 0;

        if (DatiPrenotazione.imballaggio == "true") {
            for (var i = 0; i < DatiPrenotazione.stanze.length; i++) {

                switch (DatiPrenotazione.stanze[i]) {

                    case "cucina":
                        costoImballaggio += traslocatore.costiImballaggioStanze.cucina;
                        break;

                    case "cameretta":
                        costoImballaggio += traslocatore.costiImballaggioStanze.camera;
                        break;
                    case "cameretta2":
                        costoImballaggio += traslocatore.costiImballaggioStanze.camera;
                        break;

                    case "salone":
                        costoImballaggio += traslocatore.costiImballaggioStanze.salone;

                        break;
                    case "salone2":
                        costoImballaggio += traslocatore.costiImballaggioStanze.salone;

                        break;

                    case "salaDaPranzo":
                        costoImballaggio += traslocatore.costiImballaggioStanze.salaDaPranzo;
                        break;

                    case "camera":
                        costoImballaggio += traslocatore.costiImballaggioStanze.camera;
                        break;
                    case "camera2":
                        costoImballaggio += traslocatore.costiImballaggioStanze.camera;
                        break;

                    case "bagno":
                        costoImballaggio += traslocatore.costiImballaggioStanze.bagno;
                        break;
                    case "bagno2":
                        costoImballaggio += traslocatore.costiImballaggioStanze.bagno;
                        break;

                    case "ingresso":
                        costoImballaggio += traslocatore.costiImballaggioStanze.ingresso;
                        break;

                    case "studio":
                        costoImballaggio += traslocatore.costiImballaggioStanze.studio;
                        break;

                    case "balcone":
                        costoImballaggio += traslocatore.costiImballaggioStanze.balcone;
                        break;

                    case "soffitta":
                        costoImballaggio += traslocatore.costiImballaggioStanze.soffitta;
                        break;

                    case "giardino":
                        costoImballaggio += traslocatore.costiImballaggioStanze.giardino;
                        break;

                    case "boxGarage":
                        costoImballaggio += traslocatore.costiImballaggioStanze.boxGarage;

                        break;

                    case "ripostiglio":
                        costoImballaggio += traslocatore.costiBaseStanze.ripostiglio;
                        break;

                    case "cantina":
                        costoImballaggio += traslocatore.costiBaseStanze.cantina;
                        break;

                }
            }
        }
        //in base alle stanze scelte sommo i costi del traslocatore al costoSmontaggioRiassemblaggio
        var costoSmontaggioRiassemblaggio = 0;

        if (DatiPrenotazione.smontaggioRiassemblaggio == "true") {
            for (var i = 0; i < DatiPrenotazione.stanze.length; i++) {

                switch (DatiPrenotazione.stanze[i]) {

                    case "cucina":
                        costoSmontaggioRiassemblaggio += traslocatore.costiSmontaggioRiassemblaggioStanze.cucina;
                        break;

                    case "salone":
                        costoSmontaggioRiassemblaggio += traslocatore.costiSmontaggioRiassemblaggioStanze.salone;
                        break;

                    case "salone2":
                        costoSmontaggioRiassemblaggio += traslocatore.costiSmontaggioRiassemblaggioStanze.salone;
                        break;

                    case "cameretta":
                        costoSmontaggioRiassemblaggio += traslocatore.costiSmontaggioRiassemblaggioStanze.camera;
                        break;

                    case "cameretta2":
                        costoSmontaggioRiassemblaggio += traslocatore.costiSmontaggioRiassemblaggioStanze.camera;
                        break;

                    case "salaDaPranzo":
                        costoSmontaggioRiassemblaggio += traslocatore.costiSmontaggioRiassemblaggioStanze.salaDaPranzo;
                        break;

                    case "camera":
                        costoSmontaggioRiassemblaggio += traslocatore.costiSmontaggioRiassemblaggioStanze.camera;
                        break;

                    case "camera2":
                        costoSmontaggioRiassemblaggio += traslocatore.costiSmontaggioRiassemblaggioStanze.camera;
                        break;

                    case "bagno":
                        costoSmontaggioRiassemblaggio += traslocatore.costiSmontaggioRiassemblaggioStanze.bagno;
                        break;

                    case "bagno2":
                        costoSmontaggioRiassemblaggio += traslocatore.costiSmontaggioRiassemblaggioStanze.bagno;
                        break;

                    case "ingresso":
                        costoSmontaggioRiassemblaggio += traslocatore.costiSmontaggioRiassemblaggioStanze.ingresso;
                        break;

                    case "studio":
                        costoSmontaggioRiassemblaggio += traslocatore.costiSmontaggioRiassemblaggioStanze.studio;
                        break;

                    case "balcone":
                        costoSmontaggioRiassemblaggio += traslocatore.costiSmontaggioRiassemblaggioStanze.balcone;
                        break;

                    case "soffitta":
                        costoSmontaggioRiassemblaggio += traslocatore.costiSmontaggioRiassemblaggioStanze.soffitta;
                        break;

                    case "giardino":
                        costoSmontaggioRiassemblaggio += traslocatore.costiSmontaggioRiassemblaggioStanze.giardino;
                        break;

                    case "boxGarage":
                        costoSmontaggioRiassemblaggio += traslocatore.costiSmontaggioRiassemblaggioStanze.boxGarage;

                        break;

                    case "ripostiglio":
                        costoSmontaggioRiassemblaggio += traslocatore.costiSmontaggioRiassemblaggioStanze.ripostiglio;
                        break;

                    case "cantina":
                        costoSmontaggioRiassemblaggio += traslocatore.costiSmontaggioRiassemblaggioStanze.cantina;
                        break;

                }
            }
        }
        var costoTotale = costoBase + costoImballaggio + costoSmontaggioRiassemblaggio + costoDeposito + costoDifficolta + costoDistanza;
        return costoTotale;
    },

    controllaPrenotazioneGiaRegistrata: async function (prenotazione) {
        const prenotazioneTrovata = await ModelloPrenotazione.findOne({
            emailUtente: prenotazione.emailUtente
        });

        if (prenotazioneTrovata) {
            return true;
        } else {

            return false;
        }
    }
}