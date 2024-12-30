const ProductModel = require('../models/Product.model')
const CategoryModel = require('../models/Category.model')
const createProduct = async (req, res) => {
    try {
        let Product = new ProductModel(req.body)
        await Product.save()
        res.send({ message: 'Product added succ' })
    } catch (error) {
        res.status(422).send(error)
    }
}

const getProducts = async (req, res) => {
    try {
        let result = await ProductModel.find().populate('category', 'name')
        res.send(result)
    } catch (error) {
        res.status(420).send(error)
    }
}



const updateProduct = async (req, res) => {
    let id = req.params.id
    try {
        let result = await ProductModel.updateOne({ _id: id }, req.body)
        res.send(result)
    } catch (error) {
        res.status(420).send(error)
    }
}

const deleteProduct = async (req, res) => {
    try {
        let id = req.params.id
        let result = await ProductModel.deleteOne({ _id: id })
        res.send(result)
    } catch (error) {
        res.status(420).send(error)
    }

}


const getProductById = async (req, res) => {
    let id = req.params.id
    try {
        let result = await ProductModel.findOne({ _id: id })
        res.send(result)
        console.log(id)

    } catch (error) {
        res.status(420).send(error)
    }
}


const getProductsByCategory = async (req, res) => {
    const { categoryId } = req.params;

    try {
        // Vérifier si la catégorie existe
        const category = await CategoryModel.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        // Trouver les produits par category
        const products = await ProductModel.find({ category: categoryId })
            .populate('category'); // Optionnel : pour peupler la catégorie dans le produit si nécessaire

        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


module.exports = { createProduct, updateProduct, deleteProduct, getProducts, getProductById,getProductsByCategory }
