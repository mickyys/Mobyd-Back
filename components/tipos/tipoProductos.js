const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const tipoProductosSchema = Schema({
    description : { type : String, required : true, trim : true },
    userCreate: {},
    userModify: {},
    dateCreate: {
        type: Date,
        default: Date.now
    },
    dateModify: {
        type: Date
    },
    status: {
        type: Number,
        default: 1
    }
});

module.exports = Mongoose.model('ProductsType', tipoProductosSchema);