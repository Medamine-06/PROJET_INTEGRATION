const authController = require ('../controllers/auth.controller')

module.exports = (server)=>{
    server.post('/register',authController.register)
    server.post('/register2',authController.register)
    server.post('/login',authController.login)
    server.post('/forgot-password',authController.forgotPassword)
    server.post('/reset-password',authController.resetPassword)
}