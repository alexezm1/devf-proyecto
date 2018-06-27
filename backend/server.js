const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const pelicula = require('./PeliculasSchema');
const usuario = require('./UsuarioSchema');
const calificacion = require('./CalificacionSchema');

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', (req,res)=>{
    res.send('index')
});

//---------------------CRUD PELICULA-----------------------
app.post('/api/peliculas/create', (req,res)=>{
    const {nombre,duracion,clasificacion,genero,director,sinopsis,premios,año,actores,portada,trailer} = req.body

    let newPelicula = pelicula({
        nombre,
        duracion,
        clasificacion,
        genero,
        director,
        sinopsis,
        premios,
        año,
        actores,
        portada,
        trailer
    })

    newPelicula.save((err,peli)=>{
        if(err) throw err;
        res.statusCode(201).send(peli)
    })
})

app.get('/api/peliculas', (req,res)=>{
    pelicula.find().exec()
        .then(peliculas =>{
            res.send(peliculas)
        })
        .catch(err =>{
            res.statusCode(404).send(err)
        })
})

app.get('/api/peliculas/:uid', (req,res)=>{
    const {uid} = req.params

    pelicula.findById(uid).exec()
        .then(peli =>{
            res.send(peli)
        })
        .catch(err =>{
            res.statusCode(404).send(err)
        })
})

app.listen(3000, ()=>{
    console.log('Server on 3000')
})

// app.listen(PORT,()=>{
//     console.log('server on: ' + PORT)
// });