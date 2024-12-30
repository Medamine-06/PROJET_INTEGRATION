const UserController = require('../controllers/user.controller')
const ProductController = require('../controllers/product.controller')
const CategoryController = require('../controllers/category.controller')
const OrderController = require('../controllers/order.controller');
const { isAdmin } = require('../middleware/isAdmin.middleware')
const { verifyToken } = require("../middleware/verifyToken.middleware")
const livreurController = require('../controllers/Livreur.controlleur')

module.exports = (server) => {
    server.get('/users', verifyToken, isAdmin, UserController.getUsers)
    server.get('/User/:id', verifyToken, isAdmin, UserController.getUserById)
    server.post('/create-user', UserController.createUser)
    server.put('/update-user/:id', verifyToken,UserController.updateUser)
    server.delete('/delete-user/:id', verifyToken, isAdmin, UserController.deleteUser)
    server.put('/give-Priv', verifyToken, isAdmin, UserController.givePriv)

    server.get('/products', ProductController.getProducts)
    server.get('/product/:id', ProductController.getProductById)
    server.post('/create-product', verifyToken, isAdmin, ProductController.createProduct)
    server.put('/update-product/:id', ProductController.updateProduct)
    server.delete('/delete-product/:id', verifyToken, isAdmin, ProductController.deleteProduct)
    server.get('/getProductsByCategory/:categoryId',ProductController.getProductsByCategory)

    server.get('/categories', CategoryController.getCategorys)
    server.get('/category/:id', CategoryController.getCategoryById)
    server.post('/create-category', verifyToken, isAdmin, CategoryController.createCategory)
    server.put('/update-category/:id', verifyToken, isAdmin, CategoryController.updateCategory)
    server.delete('/delete-category/:id', verifyToken, isAdmin, CategoryController.deleteCategory)

    server.get('/orders', verifyToken,isAdmin,OrderController.getOrders)
    server.get('/order/:id',verifyToken,OrderController.getOrderById)
    server.put('/update-order/:id',verifyToken, OrderController.updateOrder)
    server.delete('/delete-order/:id',verifyToken ,OrderController.deleteOrder)
    server.post('/createOrder',verifyToken,OrderController.createOrder)
    server.put('/confirmOrder/:id',verifyToken,isAdmin,OrderController.confirmOrder)

    server.get('/livreurs', livreurController.getalllivreur);
    server.get('/livreur/:id', livreurController.getlivreurById);
    server.post('/create-livreur', livreurController.createlivreur);
    server.put('/update-livreur/:id', livreurController.updateLivreur);
    server.delete('/remove-livreur/:id', livreurController.removeLivreur);

}
