const mongoose = require('mongoose');
mongoose.connect('mongodb://alexzam1:alexzam1@ds119171.mlab.com:19171/devfproyecto');


const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const usuarioSchema = new Schema({
    "id": ObjectId,
    "nombre": String,
    "apellido": String,
    "email": String,
    "fechaNacimiento": Date
});

var usuario = mongoose.model('usuario', usuarioSchema);

module.exports = usuario;