const { Servicio } = require('./servicios');

module.exports.get = async (req, res) => {
    
    let result = await Servicio
            .find({
                'paciente' : req.params.id,
                'status': Status.active
            })
            .sort('description');
    
    res.status(200).send({
         result
    });
}

module.exports.save = async (req, res) => {
    const servicio = new Servicio(req.body);
    const result = await servicio.save();

    res.status(200).send({
        result
    });
}

module.exports.update = async (req, res) => {
    const result = await Servicio.findByIdAndUpdate({_id : req.body._id}, {
        $set: req.body
    });

    res.status(200).send({
        result
    });
}

module.exports.remove = async (req, res) => {
    const result = await Servicio.findByIdAndUpdate({_id : req.params.service}, {
        $set: {
            status: Status.noactive
        }
    });

    res.status(200).send({
        result: result
    });
}
