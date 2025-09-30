const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
});

// Add method to check password
userSchema.methods.comparePassword = async function (password) {
    console.log('Password comparison:', {
        providedPasswordLength: password?.length,
        storedHashLength: this.passwordHash?.length
    });
    const result = await bcrypt.compare(password, this.passwordHash);
    console.log('Bcrypt comparison result:', result);
    return result;
};

const User = mongoose.model('User', userSchema);

module.exports = User;