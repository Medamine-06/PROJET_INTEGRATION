const mongoose = require('mongoose');


const livreurSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true,
    },
    prenom: {
        type: String,
    },
    telephone: {
        type: String,
    },
    vehicule: {
        type: String, 

    },
}, {
    timestamps: true, 
});


module.exports = mongoose.model('Livreur', livreurSchema);