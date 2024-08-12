const bcryptjs = require("bcryptjs");
const User = require("../model/adminModel");
const userModel = require('../model/userModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// register(signUp), login(signIn)

const userSignUp = async (req, res) => {
    try {
        const { name, email, photo, password, confirmPassword } = req.body;

        // checking if any field is empty
        if (!name || !email || !password) {
            return res.status(500).json({
                message: "All fields must be filled appropriately"
            });
        }

        // Checking that the email is used more than once i.e the email doesn't pre-exist

        const checkEmail = await User.findOne({ email: email });
        if (checkEmail) {
            return res.status(500).json({
                message: "Email already exists"
            });
        }

        // hashing Password
        const salt = await bcryptjs.genSalt(12);
        const hashPassword = await bcryptjs.hash(password, salt);

        // creating Password
        const newUser = await User.create({
            name, email, photo, password: hashPassword
        });

        newUser.save();
        return res.status(201).json({
            success: true,
            message: "User signUp successful",
            data: newUser
        });

    } catch (err) {
        res.status(404).json({
            success: false,
            message: [ err.message, "1" ]
        });
    }
};

// get all users
const getUsers = async (req, res) => {
    try {
        const userCall = await User.find();
        res.status(200).json({
            success: true,
            data: userCall
        });
    } catch (err) {
        res.status(404).json({
            success: false,
            message: [ err.message, "2" ]
        });
    }
};

// get a Single User
const getSingleUser = async (req, res) => {
    try {
        const userData = await User.findById(req.params.id);
        res.status(200).json({
            success: true,
            result: userData
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: [ err.message, "4" ]
        });
    }
};

// SinIn user
const userSignIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userDetails = await User.findOne({ email });
        if (!userDetails) return res.status(404).json({ message: "User does not exist" });

        const comparePassword = await bcryptjs.compare(password, userDetails.password);
        if (!comparePassword) return res.status(403).json({ message: "Invalid password" });

        const token = await jwt.sign({ _id: userDetails._id }, process.env.JWTSECRET, { expiresIn: '1d' });

        res.status(200).json({
            status: "Successful",
            data: token,
            message: "User login successful"
        });
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: error.message
        });
    }
};

const userUpdate = async (req, res) => {
    try {
        const id = req.user._id;
        const user = await User.findById(id);

        const { name } = req.body;
        if (!user) return res.status(404).json({ message: "User does not exist" });

        const update = await User.findByIdAndUpdate(user._id, { name }, { new: true });

        res.status(200).json({
            status: "Successful",
            data: update
        });
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: error.message
        });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const id = req.user._id;
        // console.log(id);
        const adminUser = await User.findById(id);

        if (!adminUser) return res.status(403).json({ message: 'Only admin can perform this operation' });

        const users = await userModel.find();

        if (users < 1) return res.status(404).json({ message: "No user found" });

        res.status(200).json({
            status: "Successful",
            data: users
        });
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: error
        });
        console.log(error);
    }
};
module.exports = { userSignUp, getUsers, getSingleUser, userSignIn, userUpdate, getAllUsers };