import userModel from "../models/user.js";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import moment from 'moment';

//  Register user
const register = async (req, res) => {

    try {
        const { name, email, password } = req.body;

        // checking if the user exits 
        const existUser = await userModel.findOne({ email });
        if (existUser) {
            return res.status(409).json({ success: false, message: 'User already exits' })
        }

        // hashed password
        const hashPassword = await bcryptjs.hash(password, 10);

        // creating user
        const newUser = await userModel.create({
            name,
            email,
            password: hashPassword,
        });

        res.status(200).json({ message: "User has been successfully registered", newUser });

    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error", error: error.message });
        console.log(error);
    }
}

// Get all users
const getuser = async (req, res) => {
    try {
        const data = await userModel.find();

        const formattedData = data.map(user => {
            const userObj = user.toObject(); // convert to plain object

            //   moment(userObj.createdAt); :  converts it into a Moment.js object 
            userObj.createdAt = moment(userObj.createdAt).format("M/D/YYYY h:mm A"); // A: AM/PM in uppercase

            //   If you want 24-hour format, replace "h:mm A" with "HH:mm".
            userObj.updatedAt = moment(userObj.updatedAt).format("M/D/YYYY h:mm A");
            return userObj;
        });

        res.status(200).json(formattedData);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

// login 
const login = async (req, res) => {

    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid email" })
        }

        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: "Invalid password" })

        }

        const token = jwt.sign({ userId: user._id }, process.env.SECRETE_KEY, { expiresIn: '1hr' })
        res.cookie('token', token, {
            httpOnly: true,
            secure: false, // production use true
            maxAge: 3600000, // 1 hour

        });

        res.status(200).json({ success: true, message: "Login successfully", user, token })

    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error", error: error.message });
        console.log(error);
    }
}

// logout
const logout = async (req, res) => {
    try {
        res.clearCookie('token')
        res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error", error: error.message })
        console.log(error)
    }
}


// delete user
const deleteuser = async (req, res) => {
    try {

        const { id } = req.params;
        const result = await userModel.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).send({
                message: "User not found"
            });
        } else {
            return res.status(200).send({
                message: "User deleted successfully..."
            });
        }


    } catch (error) {
        console.log(error);
        response.status(500).send({ message: error.message })
    }
};

export const authController = { register, getuser, login, logout, deleteuser };