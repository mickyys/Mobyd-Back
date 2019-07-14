const { Examen } = require('./examen');

module.exports.addExamen = async (req, res) => {
    const examen = new Examen(req.body);
    const result = await examen.save();

    res.status(200).send({
        result
    });
}


module.exports.updExamen = async (req, res) => {
    result = await Examen.update({_id : req.body._id}, req.body);  

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

module.exports.delExamen = async (req, res) => {

    result = await Examen.update({_id : req.params.id}, 
        { 
            userModify : { name : req.params.user },
            dateModify : new Date(),
            status : 0
        });  

    res.status(200).send({
        result
    });
}

