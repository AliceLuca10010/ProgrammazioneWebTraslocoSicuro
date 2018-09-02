
const modelloUtenti = require('../models/user');

module.exports = {
    controlloData: (data) => {
        var dataInserita = new Date(data);
        var annoInserito = dataInserita.getFullYear();
        var meseInserito = dataInserita.getMonth() + 1;
        var giornoInserito = dataInserita.getDate();
        var dataAttuale = new Date();
        var annoAttuale = dataAttuale.getFullYear();
        var meseAttuale = dataAttuale.getMonth() + 1;
        var giornoAttuale = dataAttuale.getDate();
        var minimoAnnoValido = annoAttuale - 18;

        if (annoInserito < minimoAnnoValido) {
            return true;
        } else if (annoInserito > minimoAnnoValido) {
            return false;
        } else if (annoInserito === minimoAnnoValido) {
            if (meseInserito < meseAttuale) {
                return true;
            } else if (meseInserito > meseAttuale) {
                return false;
            } else if (meseInserito === meseAttuale) {
                if (giornoInserito <= giornoAttuale) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    },

    controllaPasswordCoincidenti: (pw1, pw2) => {
        if (pw1 === pw2) {
            return true;
        }
        return false;
    },

    controllaUtenteGiaRegistrato: async(utente) => {
        const utenteTrovato = await modelloUtenti.findOne({ email: utente.email });
        if (utenteTrovato) {
            return true;
        } else {
            return false;
        }
    }
}