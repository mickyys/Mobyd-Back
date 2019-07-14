const TipoDocumentos = require('./tipoDocumentos');
const TipoPagos = require('./tipoPagos');
const TipoProductos = require('./tipoProductos');

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

async function addTipoProducto(req, res){
    let tipoProductos = new TipoProductos(req.body);
    let result = await tipoProductos.save();

    res.status(200).send({
        result 
    });
}

async function getTipoProductos(req, res){
    result = await TipoProductos.find({status : 1}).sort('description')  

    res.status(200).send({
        result
    });
}

async function updTipoProducto(req, res){
    result = await TipoProductos.update({_id : req.body._id}, req.body);  

    res.status(200).send({
        result
    });
}

async function delTipoProducto(req, res){

    result = await TipoProductos.update({_id : req.params.id}, 
        { 
            userModify : { name : req.params.user },
            dateModify : new Date(),
            status : 0
        });  

    res.status(200).send({
        result
    });
}

module.exports.getTipoPagos = getTipoPagos;
module.exports.getTipoDocumentos = getTipoDocumentos;
module.exports.addTipoPagos = addTipoPago;
module.exports.addTipoDocumentos = addTipoDocumento;
module.exports.addTipoProducto = addTipoProducto;
module.exports.getTipoProductos = getTipoProductos;
module.exports.updTipoProducto = updTipoProducto;
module.exports.delTipoProducto = delTipoProducto;