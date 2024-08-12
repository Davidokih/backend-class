const { default: mongoose } = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [ true, "Please fill in your name" ]
    },
    email: {
        type: String,
        required: [ true, "Please fill in your email" ],
        lowercase: true,
        validate: [ validator.isEmail, "Provide a valid email" ]
    },

    photo: String,

    password: {
        type: String,
        required: [ true, "Provide a password" ],
        minlength: 8
    },
    confirmPassword: {
        type: String,
        require: [ true, "Confirm your Password" ],
        validate: {
            validator: function (el) {
                return el === this.password;
            }
        },
        message: "Password not the same"
    }
});

const User = mongoose.model("admins", userSchema);
module.exports = User;