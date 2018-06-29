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
    const {nombre,duracion,clasificacion,genero,director,sinopsis,premios,año,actores,portada,trailer,calificacion} = req.body

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
        trailer,
        calificacion
    })

    newPelicula.save((err,peli)=>{
        if(err) throw err;
        res.status(201).send(peli)
    })
})
app.put('/api/peliculas/:uid', (req,res)=>{
    const{uid} = req.params

    pelicula.findByIdAndUpdate(uid, {$set: req.body}, {new: true}).exec()
        .then(pelicula =>{
            res.satuts(200).send(pelicula)
        })
        .catch(err =>{
            res.status(400).send(err)
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

    pelicula.findById(uid, {}, (err,pelicula)=>{
        calificacion.populate(pelicula, {path: "calificacion"}, (err, pelicula)=>{
            if(err) throw err
            res.status(200).send(pelicula)
        })
    })
       
})
//------------------------CRUD USUARIO---------------------
app.post('/api/usuario/create', (req, res)=>{
    const{nombre,apellido,email,fecha_nacimiento} = req.body

    let newUser = usuario({
        nombre,
        apellido,
        email,
        fecha_nacimiento
    })

    newUser.save((err,user)=>{
        if(err) throw err
        res.status(201).send(user)
    })
})

app.get('/api/usuario', (req,res)=>{
    usuario.find().exec()
        .then(user =>{
            res.send(user)
        })
        .catch(err =>{
            res.status(404).send(err)
        })
})

//----------------------CRUD CALIFICACION --------------------
app.post('/api/calificacion/create', (req,res)=>{
    const{nombreCalificador,estrellas,comentarios,fecha} = req.body

    let newCalificacion = calificacion({
        nombreCalificador,
        estrellas,
        comentarios,
        fecha
    })

    newCalificacion.save((err,calif)=>{
        if(err) throw err
        res.status(201).send(calif)
    })
})

app.get('/api/calificacion', (req,res)=>{
    calificacion.find().exec()
        .then(calificacion => {
            res.send(calificacion)
        })
        .catch(err =>{
            res.status(404).send(err)
        })
})

app.get('/api/calificacion/:uid', (req,res)=>{
    const{uid} = req.params

    calificacion.findById(uid, {}, (err,calificacion)=>{
        usuario.populate(calificacion, {path: 'nombreCalificador'}, (err,calificacion)=>{
            if(err) throw err
            res.status(200).send(calificacion)
        })
    })
        
            
        
        

})
    



// app.listen(3000, ()=>{
//     console.log('Server on 3000')
// })

app.listen(PORT,()=>{
    console.log('server on: ' + PORT)
});