const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = Schema({
    tutor : { type: mongoose.Schema.Types.ObjectId, ref: 'tutors' },
    patient : { type: mongoose.Schema.Types.ObjectId, ref: 'patient' },
    orderNumber : { type : Number, require : true },
    orderDate : { type : Date, require : true },
    orderStatus : { 
        type : String ,
        enum : ['pendiente', 'proceso', 'finalizada', 'abonada', 'eliminada'], 
        require : true},
    products : [],
    services : [],
    reference : {
        name : {type : String},
        url : {type : String}
    },
    amount : { type : Number},
    tax : { type : Number},
    amountTotal : { type : Number},
    payment : [{
        transaction : { type : String, trim : true },
        type : { type : String },
        amount : { type : Number},
        discount : [],
        turnedMoney : { type : Number },
        create : {
            user : { type : String, trim : true },
            date : Date
        },
        modify : {
            user : { type : String, trim : true },
            date : Date
        },
        status : { type : Number , default : 1}
    }],
    doctor :  { type: mongoose.Schema.Types.ObjectId, ref : 'User' }, 
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

module.exports = mongoose.model('order', orderSchema);