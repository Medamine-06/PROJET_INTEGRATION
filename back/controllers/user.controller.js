const UserModel = require('../models/User.model')
const bcrypt = require('bcrypt'); // Make sure bcrypt is imported

const createUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(422).send({ message: 'Email already exists' });
        }

        // Generate the salt with a complexity factor of 14
        const salt = await bcrypt.genSalt(14);

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user with the hashed password
        const newUser = new UserModel({
            email,
            password: hashedPassword,
            role:'user', 
        });

        // Save the new user to the database
        await newUser.save();

        // Send a success response
        res.send({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Error creating user', error });
    }
};

const givePriv = async (req, res) => {
    try {
        const { targetUserId } = req.body; 

        const targetUser = await UserModel.findById(targetUserId);
        if (!targetUser) {
            return res.status(404).send({ error: 'User not found.' });
        }

        // Step 2: Update the role of the target user to "admin"
        targetUser.role = 'admin';
        await targetUser.save();

        // Step 3: Send a success response
        return res.status(200).send({
            message: 'User role updated to admin successfully.',
            user: {
                id: targetUser._id,
                name: targetUser.name,
                role: targetUser.role,
            },
        });
    } catch (error) {
        return res.status(500).send({
            error: 'Failed to update user role.',
            details: error.message,
        });
    }
};


const getUsers = async (req, res) => {
    try {
        let result = await UserModel.find()
        res.send(result)
    } catch (error) {
        res.status(420).send(error)

    }
}



const updateUser = async (req, res) => {
    let id = req.params.id
    try {
        let result = await UserModel.updateOne({ _id: id }, req.body)
        res.send(result)
    } catch (error) {
        res.status(420).send(error)
    }
}

const deleteUser = async (req, res) => {
    try {
        let id = req.params.id
        let result = await UserModel.deleteOne({ _id: id })
        res.send(result)
    } catch (error) {
        res.status(420).send(error)
    }

}


const getUserById = async (req, res) => {
    let id=req.params.id
    try {
        let result = await UserModel.findOne({_id:id})
        res.send(result)
    } catch (error) {
        res.status(420).send(error)
    }
}

module.exports = { createUser, updateUser, deleteUser, getUsers, getUserById,givePriv }
