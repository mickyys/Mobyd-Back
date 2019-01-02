const { Estetica } = require('./estetica');

module.exports.get = async (req, res) => {
    
    let result = await Estetica.find({
                'status': Status.active
            })
            .sort('description');
    
    res.status(200).send({
         result
    });
}

module.exports.save = async (req, res) => {
    const estetica = new Estetica(req.body);
    const result = await estetica.save();

    res.status(200).send({
        result
    });
}

module.exports.update = async (req, res) => {
    const result = await Estetica.findByIdAndUpdate({_id : req.body._id}, {
        $set: req.body
    });

    res.status(200).send({
        result
    });
}

module.exports.remove = async (req, res) => {
    const result = await Estetica.findByIdAndUpdate({_id : req.params.id}, {
        $set: {
            status: Status.noactive
        }
    });

    res.status(200).send({
        result: result
    });
}
