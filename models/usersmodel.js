const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstname: {
        type: String, required: true
    },
    lastname: {
        type: String, required: true
    },
    email: {
        type: String, required: true,
        unique: true,
        validate: {
            validator: function (v) {
                // Regular expression for validating email format
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`,
        },
    },
    mobile: {
        type: String, required: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /^[0-9]{10}$/.test(v); // Regex to check for exactly 10 digits
            },
            message: props => `${props.value} is not a valid 10-digit mobile number!`,
        },
    },
    password: {
        type: String, required: true, select: false
    },
    profilepic: {
        type: String, required: false
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("users", userSchema);
// above model will create users collection in db with fields defiend in userschema