const { mongoose } = require('./db');

let UserSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: false
    }
})
let User = mongoose.model('Users', UserSchema);
module.exports = { User }