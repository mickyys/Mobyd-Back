const { Servicio } = require('./servicios');
const  moment = require('moment-timezone');


module.exports.getServicio = async (req, res) => {
    
    let result = await Servicio
            .find({
                'status': Status.active
            })
            .sort('description');
    
    res.status(200).send({
         result
    });
}

module.exports.addServicio = async (req, res) => {
    const servicio = new Servicio(req.body);
    const result = await servicio.save();

    res.status(200).send({
        result
    });
}

module.exports.updServicio = async (req, res) => {
    const result = await Servicio.findByIdAndUpdate(req.body._id, {
        $set: req.body
    });

    res.status(200).send({
        result
    });
}

module.exports.delServicio = async (req, res) => {
    const result = await Servicio.findByIdAndUpdate(req.params.id, {
        $set: {
            status: Status.noactive,
            userModify : { name : req.params.user } ,
            dateModify : moment().tz("America/Santiago").format()

        }
    });

    res.status(200).send({
        result: result
    });
}
