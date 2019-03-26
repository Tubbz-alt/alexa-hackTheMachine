const { mongoose } = require('./db');

var UserSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: false
    }
})

UserSchema.methods.findUser = async function (token) {
    let users;
    try {
        users = await this.find({ token }).catch((err) => { process.logger(undefined, err) });
        if (users) {
            const user = users.next();
            return user;
        }
    } catch (err) {
        process.logger(undefined, err);
    }
}

var User = mongoose.model('Users', UserSchema);
module.exports = { User }