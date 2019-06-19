const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const tipoPagosSchema = Schema({
    _id : { type : String,  uppercase: true, index: { unique: true }, required : true  }, 
    description : { type : String, required : true }
});

module.exports = Mongoose.model('PaymentsType', tipoPagosSchema);