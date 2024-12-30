// importations 
const express = require('express')
const mongoose=require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors'); 

//2. initialisations

const server = express()
dotenv.config()
server.use(cors());
//Activer la format JSON dans le body
server.use(express.json())
mongoose.connect(process.env.DB)
.then(()=>{
    console.log('MongoDB connected')

})
.catch(()=>{
    console.log('MongoError')
})

//3.traitements

/* server.get('/',(req,res)=>{
    res.send('hello project')
}) 
 */

// importer apis.routes.js
require('./routes/api.routes')(server)
require('./routes/auth.routes')(server)

//4.lancement du serveur
server.listen(process.env.PORT || 3000,()=>{
    console.log('server run on http:localhost:'+process.env.PORT)
})
