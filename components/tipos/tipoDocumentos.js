const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const tipoDocumentosSchema = Schema({
    description : { type : String, required : true }
});

module.exports = Mongoose.model('DocumentsType', tipoDocumentosSchema);