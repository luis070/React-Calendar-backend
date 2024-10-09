// esta es uan exportacion manual
const path = require( 'path' )

const express = require('express');
const { dbConnection } = require('./database/config');
require ('dotenv').config()
const cors = require('cors')
// con esto chemos el env
// console.log(process.env);



// crear e lservidor de express 
const app = express();

// base de datos 
dbConnection();

// cors 
app.use( cors())

// directorio public es un middle ware  es una funcion simple cuando ejecuta cuando algo pasa por aqui
app.use(express.static('public'))

// lecutra y parseo del body auqi leemos el json
app.use(express.json() )

// rutas 
// app.use('/api/auth', require('./routes/auth') )
app.use('/api/auth', require('./routes/auth') )
// continuacion de la parte 24 
app.use('/api/events', require('./routes/events') )

app.use('*', (req,res) => {
    res.sendFile( path.join(__dirname, 'public/index.html'))
})

// rutas, era un ejemplo que funciona nuestro backend
// app.get('/',(req, res)=>{
//     console.log('se requiere el /');
//     res.json({
//         ok:true
//     })
// })


// escuchar peticiicones 
app.listen ( process.env.PORT, ()=>{
    console.log(`servidor corriendo en puert ${ process.env.PORT}`);
    
})
