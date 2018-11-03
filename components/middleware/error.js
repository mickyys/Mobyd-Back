module.exports = function(err, req, res, next){
    res.status(500).send({ 
        message : "Algo ha fallado",
        error : err.message
    });
}