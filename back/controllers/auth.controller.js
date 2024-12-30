const UserModel = require("../models/User.model")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const uuid = require('uuid')

exports.register = (req, res) => {
    UserModel.findOne({ email: req.body.email })
        .then((user) => {
            if (user) {
                res.status(422).send({ message: 'Email exist' })

            } else {
                //generation de la clé de hashage puissance entre 10 et 20
                bcrypt.genSalt(14)
                    .then((key) => {
                        bcrypt.hash(req.body.password, key)
                            .then((hashedPass) => {
                                let new_user = new UserModel(req.body);
                                new_user.password = hashedPass
                                new_user.save()
                                    .then((data) => {
                                        res.send(data)
                                    }).catch(err => res.status(422).send(err))
                            })

                            .catch(err => res.status(422).send(err))
                    }).catch(err => res.status(422).send(err))

            }
        }).catch(err => res.status(422).send(err))
}

exports.register2 = async (req, res) => {
    try {
        let user = await UserModel.findOne({ email: req.body.email })

        if (user) {
            res.status(422).send({ message: 'Email exist' })

        } else {

            // let key = await bcrypt.genSalt(14) 
            // let hashedPass = await bcrypt.hash(req.body.password, key)
            let new_user = new UserModel(req.body);
           // new_user.password = hashedPass
            await new_user.save()
            
        }
    }

    catch (err) {
        res.status(422).send(err)
    }
}

exports.login = async (req, res) => {
    try {

        let user = await UserModel.findOne({ email: req.body.email });

        if (!user) {
            return res.status(422).send({ message: 'Invalid credentials' });
        }

    
        let comparaison = await bcrypt.compare(req.body.password, user.password);

        if (comparaison) {

            const email = user.email;
            const isAdmin = user.role === 'admin';

           
            let token = await jwt.sign(
                { _id: user._id, email: user.email, role: user.role },
                process.env.SECRETKEY || '123',
               
            );

           
            res.send({
                message: 'Logged in successfully',
                isAdmin,
                token,
                email
            });
        } else {
            res.status(423).send({ message: 'Invalid credentials' });
        }
    } catch (err) {
        res.status(500).send({ message: 'Error logging in', error: err });
    }
};

const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
})

exports.forgotPassword = async (req, res) => {
    //1: test if user exist with email(req.body)
    try {
        let email = req.body.email;
        let result = await UserModel.findOne({ email: email })
        if (!result) {
            res.status(422).send({ message: 'invalid account ' })
        } else {
            //2: generate unique if (exple :jwt)
            let resetKey = uuid.v4()
           console.log(resetKey)

            //3: save unique id 
            result.resetKey = resetKey
            let timeout = new Date();
            timeout.setHours(timeout.getHours()+1)
             result.resetTimeout = timeout
            await result.save()
            
            //4:send mail

            let mailContent = {
                from: 'NODE APPLICATION',
                to: email,
                subject: 'Reset password link',
                text: 'reset key : ' + resetKey,
                html: `reset link : <a href="http://localhost:3000/reset/${resetKey}">here <a/>`
            }
            await transporter.sendMail(mailContent)
            
            res.send({ message: 'Mail sent successfully' })

        }
    } catch (error) {
        console.log(error)
        res.status(422).send(error)
    }

}
exports.resetPassword = async (req, res) => {
    if (req.body.resetKey && req.body.newPass) {
        try {
            // 1: search user by resetKey
            let user = await UserModel.findOne({ resetKey: req.body.resetKey })
            if (!user) {
                res.status(422).send({ message: 'Invalid Account' })
            }
            else {
                if(new Date()< new Date(user.resetTimeout)){
                let salt = await bcrypt.genSalt(10)
                user.password = await bcrypt.hash(req.body.newPass , salt)
                user.resetKey = undefined
                await user.save()
                res.send({ message: 'user updated' })
            }else{
                res.status(444).send({message : 'Expired reset link'})
            }

            }
        }
        // 2: hashage password
        catch (error) {
            console.log(error)
            res.status(422).send(error)

        }
    }
    else {
        res.status(422).send({ message: "Missing parametres" })
    }
}
