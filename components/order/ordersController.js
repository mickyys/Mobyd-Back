'use strict';

const Orders = require('./orders');
const Tutor = require('../tutor/tutor');
const TutorController = require('../tutor/tutorsController');
const Patient = require('../paciente/paciente');
const PaientController = require('../paciente/pacienteController');
const Medicos = require('./../medicos/medicosController');

const getOrderNumber = async () => {
    return await Orders.countDocuments() + 1001;     
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

const addOrderWithPayment = async (order, tutor, patient, products, services, amount, tax, amountTotal, doctor, user, payment) =>{
    
    const orderNumber = await getOrderNumber();
    let orderTutor = await TutorController.getTutorForName('');
    let orderPatient = await PaientController.getPatientForName('');    
    let orderDoctor = await Medicos.getDoctorForName('');

    
    if(tutor._id == null && tutor._id == undefined && tutor.name != null ){  
        orderTutor = await new Tutor({ name : tutor.name }).save();
    }else if(tutor._id != null){
        orderTutor = tutor._id;
    }

    if(patient._id == null  && patient._id == undefined && patient.name != null){  
        orderPatient = await new Patient({ name : patient.name, number : await PaientController.getPacienteNumber() }).save();
    }else if (patient._id != null){
        orderPatient = patient._id;
    }

    if(doctor != null && doctor != undefined){
        orderDoctor = doctor;
    }

    const newOrder = new Orders({
        tutor : orderTutor,
        patient : orderPatient,
        orderNumber : orderNumber,
        orderDate : order.date,
        orderStatus : order.status,
        products : products,
        services : services,
        amount : amount,
        tax : tax,
        amountTotal : amountTotal,
        doctor: orderDoctor,
        payment : payment,
        create : {
            user : user.name,
            date : Date()
        }
    });

    const result = await newOrder.save();
    
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
module.exports.addOrderWithPayment = addOrderWithPayment;