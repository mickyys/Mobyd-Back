const jwt = require('jsonwebtoken');
const config = require('config');

module.exports =  function(req, res, next){
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send("Acceso denegado, se require token");

    try{
        const decoded = jwt.verify(token, config.get('jwtPrivatekey'));
        req.user = decoded;
        next();
    }
    catch(ex){
        return res.status(400).send({ mensaje : 'Token invalido', err : ex});
    }    
}