'use strict';

const InformeMedico = require('./informeMedico');
const Product = require('../../products/productsController')

module.exports.addInformeMedico = async (body) => {
    const informeMedico = new InformeMedico(body);

    if(body.products.length > 0){
        body.products.forEach(product => {
            Product.updateQty(product._id, -product.qty);
        });
    }

    const result = await informeMedico.save();
    return result;
}

module.exports.getInformeMedico = async (idInforme, idPaciente) => {

    let result;

    if (idInforme) {
        result = await InformeMedico
            .findById({_id : idInforme}, )
            .sort('descripcion');
    } else {
        result = await InformeMedico
            .find({
                'paciente' : idPaciente,
                'status': Status.active
            })
            .sort('descripcion');
    }
    
    return result;
}

module.exports.updInformeMedico = async (body) => {

    let informeMedico = await this.getInformeMedico(body._id, null);
    let productsArray  = [];

    body.products.forEach(product =>{
        let prod = informeMedico.products.find(x => x._id === product._id);
        if(prod === undefined){
            productsArray.push({ ...product});
        }else{
            if(product.qty != prod.qty){
                productsArray.push({ ...product, qty : (product.qty - prod.qty)});
            }
        } 
    });

    if(productsArray.length > 0){
        productsArray.forEach(product => {
            Product.updateQty(product._id, -product.qty);
        });
    }

    const result = await InformeMedico.findByIdAndUpdate(body._id, {
        $set: body
    });

    return result;
}

module.exports.delInformeMedico = async (idInforme) => {

    const result = await InformeMedico.findByIdAndUpdate({_id : idInforme}, {
        $set: {
            status: Status.noactive
        }
    });

    return result;
}


function addHistorial(informeMedico){
    let description = "Motivo : " + informeMedico.motivo + "r\n\ " +
                      "Examen Fisico : " +informeMedico.examenFisico + "r\n\ " +
                      "F.C. : " + informeMedico.fc + "r\n\ " +
                      "F.R. : " + informeMedico.fr + "r\n\ " +
                      "P.A. : " + informeMedico.pa + "r\n\ " +
                      "T.L.L.C. : " + informeMedico.tllc + "r\n\ " +
                      "Temperatura : " + informeMedico.temperatura + "r\n\ " +
                      "Mucosas : " + informeMedico.mucosas.description + "r\n\ " +
                      "Peso : " + informeMedico.peso + "r\n\ ";
}