const General = require('./general');
const status = require('../enums/status.enums');

async function get(req, res){

    let result = await General.findById(req.params.id);
    
    res.status(200).send({
        result
    });
}

async function update(req, res){    
    let result = await General.findByIdAndUpdate(req.body._id, req.body);

    res.status(200).send({
        result 
    });
}

async function add(req, res){    
    let general = new General(req.body);
    let result = await general.save();

    res.status(200).send({
        result 
    });
}

module.exports.get = get;
module.exports.add = add;
module.exports.update = update;