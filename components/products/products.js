const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const productsSchema = Schema({
    name : { type : String, uppercase : true, trim : true, required : true },
    qty : { type : Number },   
    qtyMin : { type : Number },
    priceSale : { type : Number },
    price : { type : Number },
    tax : { type : Number },
    barcode : { type : String },
    type : { type: Mongoose.Schema.Types.ObjectId, ref: 'ProductsType', required : true},   
    discount : [{
        date : {
            start : Date,
            end : Date
        },
        type : { type : String },
        amount : { type : Number },
        percent : { type : Number },
        create : {
            user : { type : String, trim : true },
            date : Date
        },
        modify : {
            user : { type : String, trim : true },
            date : Date
        },
        status : { type : Number }
    }],
    charges : [{
        date : {
            start : Date,
            end : Date
        },
        type : { type : String },
        amount : { type : Number },
        percent : { type : Number },
        create : {
            user : { type : String, trim : true },
            date : Date
        },
        modify : {
            user : { type : String, trim : true },
            date : Date
        },
        status : { type : Number }
    }],
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

module.exports = Mongoose.model('Products', productsSchema);