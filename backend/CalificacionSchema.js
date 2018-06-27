const mongoose = require('mongoose');
mongoose.connect('mongodb://alexzam1:alexzam1@ds119171.mlab.com:19171/devfproyecto');
var usuario = require('./UsuarioSchema');

const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const calificacionSchema = new Schema({
    "id": ObjectId,
    "nombreCalificador": String,
    "estrellas": Number,
    "comentarios": String,
    "fecha": Date
});

var calificacion = mongoose.model('calificacion', calificacionSchema);

module.exports = calificacion;