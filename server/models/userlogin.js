const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const User = new Schema(
    {
        email: 
        {
            type: String, required: true, unique: true,
        },
        password: 
        {
            type: String, required: true
        },
    
     }
     //,
    // {
    //     collection: 'user-data'
    // }
)

const model = mongoose.model('UsersData', User)

module.exports = model 