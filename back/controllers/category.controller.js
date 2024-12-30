const CategoryModel = require('../models/Category.model')

const createCategory = async (req, res) => {
    try {
        let Category = new CategoryModel(req.body)
        await Category.save()
        res.send({ message: 'Category added succ' })
    } catch (error) {
        res.status(422).send(error)
    }
}

const getCategorys = async (req, res) => {
    try {
        let result = await CategoryModel.find()
        res.send(result)
    } catch (error) {
        res.status(420).send(error)
    }
}



const updateCategory = async (req, res) => {
    let id = req.params.id
    try {
        let result = await CategoryModel.updateOne({ _id: id }, req.body)
        res.send(result)
    } catch (error) {
        res.status(420).send(error)
    }
}

const deleteCategory = async (req, res) => {
    try {
        let id = req.params.id
        let result = await CategoryModel.deleteOne({ _id: id })
        res.send(result)
    } catch (error) {
        res.status(420).send(error)
    }

}


const getCategoryById = async (req, res) => {
    let id=req.params.id
    try {
        let result = await CategoryModel.findOne({_id:id})
        res.send(result)
    } catch (error) {
        res.status(420).send(error)
    }
}

module.exports = { createCategory, updateCategory, deleteCategory, getCategorys, getCategoryById }
