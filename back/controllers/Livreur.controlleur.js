const livreurmodel = require("../models/Livreur.model")

const createlivreur = (req, res) => {
    console.log(req.files)
    let livreur = new livreurmodel(req.body)


    livreur.save().then((result) => {
        res.send(result)
    }).catch((err) => {
        console.log(err)
        res.status(410).send(err.errorResponse)
    })


}
const getalllivreur = async (req, res) => {
    console.log(req.user)
    let result = await livreurmodel.find()
    res.send(result)
}



const getlivreurById = async (req, res) => {
    let id = req.params.x
    try {
        let data = await livreurmodel.findOne({ _id: id })
        res.send(data)
    } catch (err) {
        res.status(420).send(err)
    }
}

const updateLivreur = async(req, res) => {
    let id = req.params.id
    try{
       let result =await livreurmodel.updateOne({_id : id} ,req.body ,{new: true})
       res.send(result)
    }catch(err){
        res.status(420).send(err)
    }

}

const removeLivreur = (req, res) => {
    let id = req.params.id
    livreurmodel.deleteOne({_id : id})
    .then((result)=>{
        res.send(result)
    }).catch((err)=>{
        res.status(420).send(err)
    })
}



module.exports = {
    createlivreur,
    getalllivreur,
    getlivreurById,
    updateLivreur,
    removeLivreur,
};