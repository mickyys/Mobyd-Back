const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const tipoPagosSchema = Schema({
    description : { type : String, required : true }
});

module.exports = Mongoose.model('PaymentsType', tipoPagosSchema);