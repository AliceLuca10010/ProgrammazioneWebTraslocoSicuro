var express = require("express");
var index = express();
var session = require('express-session');
var bodyParser = require("body-parser");
const server = express(); //chiamata al server
const porta = 2000; //la porta
const path = require('path');
var userController = require("./controllers/user.js");
const UserModel = require('./models/user');
const dotenv = require('dotenv');
dotenv.config();
const postino = require('./controllers/postino');
const nodemailer = require('nodemailer');

const mongoose = require('mongoose');

var globalUser;

var bcrypt = require('bcrypt');
server.use(express.static("public"));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
    extended: true
}));

server.set('view engine', 'ejs');

var mongoDB = 'mongodb://127.0.0.1/traslocosicuro';

mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||

//use sessions for tracking logins
index.use(session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false
}));


//|||||||||||||||||||||||||||||||||||||||||||||||||||||



server.listen(porta, function() { //inserisco cosa fa il server quando lo richiamo
    console.log("server in ascolto sulla porta " + porta);

});


server.get("/", function(req, res) {
    res.render('home');
});

<<<<<<< HEAD
server.get("/chiSiamo", function(req, res) {
    res.render('chiSiamo');
=======
server.get("/chiSiamo", function (req, res) {
    res.render('chiSiamo', {classiColonna: "", classiBottone: ""});
>>>>>>> ab2f0dc8f0a944d69d295dc1d3dfe3ae4bc03288
});
server.get("/doveSiamo", function(req, res) {
    res.render('doveSiamo');
});
server.get("/comeFunziona", function(req, res) {
    res.render('comeFunziona');
});
server.get("/conChiLavoriamo", function(req, res) {
    res.render('conChiLavoriamo');
});
server.get("/condizioniDiVendita", function(req, res) {
    res.render('condizioniDiVendita');
});
server.get("/contattaci", function(req, res) {
    res.render('contattaci');
});
server.get("/informativaSullaPrivacy", function(req, res) {
    res.render('informativaSullaPrivacy');
});
server.get("/servizi", function(req, res) {
    res.render('servizi');
});

<<<<<<< HEAD
server.get("/paginaPersonale", function(req, res) {
    res.render('paginaPersonale');
});

server.get('/registrati', function(req, res) {
    res.render('registrati', {
        messaggioErrore: "",
        bootstrapClasses: ""
    });
=======
server.get("/paginaPersonale", function (req, res) {
    res.render('paginaPersonale');
});

server.get('/registrati', function (req, res) {
    res.render('registrati',
        {
            messaggioErrore: "",
            bootstrapClasses: ""
        });
>>>>>>> ab2f0dc8f0a944d69d295dc1d3dfe3ae4bc03288
});

server.post('/registrati/locale', function(req, res) {

    var User = {
        nome: req.body.nome,
        cognome: req.body.cognome,
        dataNascita: req.body.dataNascita,
        indirizzo: {
            via: req.body.via,
            stato: req.body.stato,
            citta: req.body.citta,
            provincia: req.body.provincia,
            cap: req.body.cap
        },
        telefono: req.body.telefono,
        email: req.body.email,
        password: req.body.password,
        confermaPassword: req.body.confermaPassword
    }

    if (!userController.controllaPasswordCoincidenti(User.password, User.confermaPassword)) {
<<<<<<< HEAD
        res.render('registrati', {
            messaggioErrore: "Le due password non coincidono",
            bootstrapClasses: "text-left alert alert-danger"
        });
=======
        res.render('registrati',
            {
                messaggioErrore: "Le due password non coincidono",
                bootstrapClasses: "text-left alert alert-danger"
            });
>>>>>>> ab2f0dc8f0a944d69d295dc1d3dfe3ae4bc03288
        return;
    }


    if (!userController.controlloData(User.dataNascita)) {
<<<<<<< HEAD
        res.render('registrati', {
            messaggioErrore: "Non sei maggiorenne",
            bootstrapClasses: "text-left alert alert-danger"
        });
        return;
    }

    res.render('', {
        User,
        classiColonna: "col-sm-2 col-xs-2 col-lg-2 col-md-2 btn-group dropup",
        classiBottone: "btn btn-custom dropdown-toggle",


=======
        res.render('registrati',
            {
                messaggioErrore: "Non sei maggiorenne",
                bootstrapClasses: "text-left alert alert-danger"
            });
        return;
    }

    globalUser = User;
    res.redirect('/benvenuto');
    res.render('paginaPersonale', { 
        User,
        classiColonna : "col-sm-2 col-xs-2 col-lg-2 col-md-2 btn-group dropup",
        classiBottone : "btn btn-custom dropdown-toggle",
        
        
>>>>>>> ab2f0dc8f0a944d69d295dc1d3dfe3ae4bc03288
    });



<<<<<<< HEAD
    var newUser = new UserModel({
        nome: User.nome,
        cognome: User.cognome,
        indirizzo: {
            via: User.indirizzo.via,
            provincia: User.indirizzo.provincia,
            stato: User.indirizzo.stato,
            citta: User.indirizzo.citta,
            cap: User.indirizzo.cap,
        },
        dataNascita: User.dataNascita,
        telefono: User.telefono,
        email: User.email,
        password: User.password
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Trasloco Sicuro"', // sender address
        to: User.email, // list of receivers
        subject: 'Registrazione Completata', // Subject line
        text: 'Benvenuto su Trasloco Sicuro. La sua registrazione è andata a buon fine 🙂', // plain text body
        html: '<h1>Benvenuto su Trasloco Sicuro</h1><p>La sua registrazione è andata a buon fine :)</p>' // html body
    };

    postino.sendMail(mailOptions, (error, info) => {
=======
    var newUser = new UserModel(
        {
            nome: User.nome,
            cognome: User.cognome,
            indirizzo: {
                via: User.indirizzo.via,
                provincia: User.indirizzo.provincia,
                stato: User.indirizzo.stato,
                citta: User.indirizzo.citta,
                cap: User.indirizzo.cap,
            },
            dataNascita: User.dataNascita,
            telefono: User.telefono,
            email: User.email,
            password: User.password
        });

    postino.sendMail(postino.creaMailOptions(User), (error, info) => {
>>>>>>> ab2f0dc8f0a944d69d295dc1d3dfe3ae4bc03288
        if (error) {
            return console.log(error);
        }
        console.log('Message sent to: %s', User.email);
    });

    newUser.save(function(err) {
        if (err) console.log(err); //return handleError(err);
    });
    //console.log(User);
});

server.get('/login', function(req, res) {
    res.render('login');
});

server.post('/login/locale', function(req, res) {
    var dati = {
        email: req.body.email,
        password: req.body.password
    }

    console.log(dati);
});

server.get('/benvenuto', function (req, res) {
    res.render('benvenuto', globalUser);
});