const TipoDocumentos = require('./tipoDocumentos');
const TipoPagos = require('./tipoPagos');

async function getTipoDocumentos(req, res){

    result = await TipoDocumentos.find().sort('description')  

    res.status(200).send({
        result
    });
}

async function getTipoPagos(req, res){

    result = await TipoPagos.find().sort('description')  

    res.status(200).send({
        result
    });
}

async function addTipoDocumento(req, res){
    let tipoDocumentos = new TipoDocumentos(req.body);
    let result = await tipoDocumentos.save();

    res.status(200).send({
        result 
    });
}

async function addTipoPago(req, res){
    let tipoPagos = new TipoPagos(req.body);
    let result = await tipoPagos.save();

    res.status(200).send({
        result 
    });
}

module.exports.getTipoPagos = getTipoPagos;
module.exports.getTipoDocumentos = getTipoDocumentos;
module.exports.addTipoPagos = addTipoPago;
module.exports.addTipoDocumentos = addTipoDocumento;