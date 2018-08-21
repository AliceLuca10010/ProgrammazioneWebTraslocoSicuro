# TRASLOCO SICURO
## Applicazione web per prenotare il traslocatore più vicino a te!
### Provala! Soddisfatti o rimborsati!

## Installazione e avvio
    git clone https://github.com/AliceLuca10010/ProgrammazioneWebTraslocoSicuro.git
    cd ProgrammazioneWebTraslocoSicuro
    npm install
    nodemon index.js

## Breve presentazione degli obiettivi dell’applicazione
La nostra applicazione Trasloco Sicuro è una piattaforma utile per far comunicare i
traslocatori e i clienti, permettendo una facile prenotazione del servizio di trasloco,
mettendo a disposizione del cliente il traslocatore più vicino a sé.

Prima di confermare la prenotazione al cliente sarà fornito un preventivo.


### Spiegazione più o meno dettagliata delle funzionalità
Nella nostra applicazione è presente un unico attore: il __cliente__.
Il cliente si divide in: __cliente non registrato__ e __cliente registrato__.

Il cliente non registrato può navigare il sito, visualizzando le pagine relative alle
informazioni del nostro servizio, oppure (se maggiorenne) registrarsi, diventando un
cliente registrato.

Il cliente registrato, oltre alle funzioni descritte per il cliente non registrato, una volta
effettuato il login, può accedere alla propria pagina personale e può richiedere un
preventivo compilando un apposito form. Se il preventivo viene accettato, il sistema
prenoterà in automatico un appuntamento con il traslocatore, mandando un’email di
conferma al cliente.

Quando viene richiesto il preventivo il sistema sceglierà il traslocatore più vicino al
cliente e, in base ai servizi selezionati e ai prezzi relativi a quel traslocatore,
calcolerà il costo finale del servizio.

## Struttura Database
Tabella __Cliente__: **email**​, password, ...ecc dati personali ecc…, coordinate: {lat, lan}

Tabella __Traslocatore__: **id​**, ...ecc dati personali ecc…, prezzi: {servizio1, servizio2…},
coordinate: {lat, lan}

## Tecnologie usate
**Front-End**: View-Engine in EJS, Bootstrap, CSS

**Back-End**: NodeJS/Express,BcryptJS, API Google Maps, Cookies, NodeMailer,
Dotenv

**Gestione DB**: Mongoose/MongoDB

**Controllo Versione**: Git su Github
