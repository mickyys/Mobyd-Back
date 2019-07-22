const Revacunacion = require('./revacunacion');
const status = require('../enums/status.enums');

async function get(req, res){

    const id = req.params.id;
    let result;

    if(req.params.dateBegin && req.params.dateEnd){
        result = await Revacunacion.find({'status' : status.active,  date: { $gte: req.params.dateBegin, $lte: req.params.dateEnd} }).populate('tutor').populate('paciente');    
    }else{
        result = await Revacunacion.find({'status' : status.active}).populate('tutor').populate('paciente');
    }

    res.status(200).send({
        result
    });
}

async function add(req, res){
    let revacunacion = new Revacunacion(req.body);
    let result = await revacunacion.save();

    res.status(200).send({
        result 
    });
}

async function remove(req, res){    
    let result = await Revacunacion.findOneAndUpdate(req.params.id, {
        status : status.noactive
    });

    res.status(200).send({
        result
    });
}

module.exports.get = get;
module.exports.add = add;
module.exports.remove = remove;