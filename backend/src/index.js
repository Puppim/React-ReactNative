const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
// const requireDir = require('require-dir');


//iniciando o app
const app = express();

const server = require('http').Server(app)
const io = require('socket.io')(server)

// app.use(express.json());

//iniciando o banco de dados
mongoose.connect("mongodb+srv://omnipuppim:123godi@cluster0-pek4b.mongodb.net/test?retryWrites=true",{useNewUrlParser:true});

app.use((req,res,next)=>{
    req.io = io
    next()
})

app.use(cors())

app.use('/files', express.static(path.resolve(__dirname,'..','uploads','resized')))

app.use(require('./routes'))

//require('./src/model/Product'); //para cada moddel eh necessario ... se nao install npm install require-dir
// requireDir('./models');

//Rotas
// app.use('/api', require('./routes'));

server.listen(process.env.PORT ||3333);

