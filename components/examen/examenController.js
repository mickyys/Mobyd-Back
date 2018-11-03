const { Examen } = require('./examen');

module.exports.addExamen = async (req, res) => {
    const examen = new Examen(req.body);
    const result = await examen.save();

    res.status(200).send({
        result
    });
}

module.exports.getExamen = async (req, res) => {
    let result;

    if (req.params.id) {
        result = await Examen
            .findById(req.params.id);
    } else {
        result = await Examen
            .find({
                'status': Status.active
            })
            .sort('description');;
    }
    
    res.status(200).send({
        examen : result
    });
}

