'use strict';

const Orders = require('./orders');
const Medicos = require('./../medicos/medicosController');

const getOrderNumber = async () => {
    return await Orders.count() + 1001;     
}

const addOrder = async (tutor, patient, products, services, amount, tax, amountTotal, doctor, user, reference) => {  
    
    const orderNumber = await getOrderNumber();

    const order = new Orders({
        tutor : tutor,
        patient : patient,
        orderNumber : orderNumber,
        orderDate : Date(),
        orderStatus : 'pendiente',
        products : products,
        services : services,
        amount : amount,
        tax : tax,
        amountTotal : amountTotal,
        doctor: doctor,
        reference : reference,
        create : {
            user : user,
            date : Date()
        }
    });

    const result = await order.save();  
    
    return result;
}

const getOrders = async (status, dateStart, dateEnd) => {
    
    let mongoStatus = {'status' : Status.active,  'create.date' : { $gte: dateStart, $lte: dateEnd} };

    if(status != 'all'){
        mongoStatus = {'status' : Status.active, 'orderStatus' : status,  'create.date' : { $gte: dateStart, $lte: dateEnd } };
    }

    let result = await Orders.find(mongoStatus)
        .populate('tutor')
        .populate('patient')
        .populate('doctor', Medicos.columnsDoctors)
        .sort('status');    

    return result;
}

const getOrderById = async (id) => {    
  
    let result = await Orders.find({_id : id})
        .populate('tutor')
        .populate('patient')
        .populate('doctor', Medicos.columnsDoctors)
        .sort('status');    

    return result;
}

const updPayment = async (id, status, payment) => {
    let result = await Orders.findByIdAndUpdate(id, {
        payment : payment,
        orderStatus : status
    },{ new : true }
    );

    return result;
}

const updPaymentAll = async (id, status, payment, products, services) => {
    let result = await Orders.findByIdAndUpdate(id, {
        payment : payment,
        products : products,
        services : services,
        orderStatus : status
    }, { new : true });

    return result;
}


module.exports.addOrder = addOrder;
module.exports.getOrders = getOrders;
module.exports.updPayment = updPayment;
module.exports.getOrderById = getOrderById;
module.exports.updPaymentAll = updPaymentAll;