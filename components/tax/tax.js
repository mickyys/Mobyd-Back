const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const taxSchema = Schema({
    description : { type : String, uppercase : true, trim : true, required : true },
    value : { type : Number,  required : true },   
    create : {
        user : { type : String, trim : true },
        date : Date
    },
    modify : {
        user : { type : String, trim : true },
        date : Date
    },
    status : { type : Number , default : 1}
});

module.exports = Mongoose.model('tax', taxSchema);