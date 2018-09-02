const ModelsTraslocatore = require('../models/traslocatore');
const ModelloTraslocatore = ModelsTraslocatore.modelloTraslocatore;



controllaTraslocatoreGiaRegistrato = async function (traslocatore) {
    const traslocatoreTrovato = await ModelloTraslocatore.findOne({
        partitaIVA: traslocatore.partitaIVA
    });

    if (traslocatoreTrovato) {
        return true;
    } else {

        return false;
    }
}

controlloTraslocatoriInizialiDatabase = async function (listaTraslocatori) {


    for (var i = 0; i < listaTraslocatori.length; i++) {

        if (await controllaTraslocatoreGiaRegistrato(listaTraslocatori[i]) === false) {
            listaTraslocatori[i].save(function (err) {
                if (err) {
                    return console.log("ERRORE DEL TIPO ", err);
                }

            });
        } 
    }

}



module.exports = { controllaTraslocatoreGiaRegistrato, controlloTraslocatoriInizialiDatabase };



