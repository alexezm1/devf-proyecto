const mongoose = require('mongoose')
mongoose.connect('mongodb://alexzam1:alexzam1@ds119171.mlab.com:19171/devfproyecto')
var calificacion = require('./backend/CalificacionSchema.js')

const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId

const peliculasSchema = new Schema({
    "id": ObjectId,
    "nombre": String,
    "duracion": String,
    "clasificacion": String,
    "genero": String,
    "director": String,
    "sinopsis": String,
    "premios": [],
    "año": Number,
    "actores": [],
    "portada": String,
    "trailer": String,
    "calificacion": [{
        type: Schema.ObjectId,
        ref: calificacion
    }]
})

var peliculas = mongoose.model('Peliculas', peliculasSchema)
module.exports = peliculas