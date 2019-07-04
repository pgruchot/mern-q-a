const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    email: { type: String, unique: true },
	local: {
		username: { type: String, unique: false, required: false },
		password: { type: String, unique: false, required: false }
	},
});

userSchema.methods = {
    checkPassword: (inputPassword, localPassword) => {
        return bcrypt.compareSync(inputPassword, localPassword);
    },
    hashPassword: plainTextPassword => {
        return bcrypt.hashSync(plainTextPassword, 10);
    }
};

const User = mongoose.model('User', userSchema);
module.exports = User;
