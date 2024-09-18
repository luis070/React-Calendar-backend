const jwt = require('jsonwebtoken')

const validarJWT = (req, res = response, next )=> {
    // x-token header 
    const token = req.header('x-token')

    // console.log(token);

    if (!token) {
        return res.status(401).json({
            ok:false,
            msg:'no hay token en la peticion'
        });
    }

    try {
        // const payload = jwt.verify(
        const {uid,name} = jwt.verify(
            token,
            process.env.SCRET_JWT_SEED
        );
        // console.log(payload);
        req.uid = uid;
        req.name= name;
        
    } catch (error) {
         return res.status(401).json({
        ok:false,
        msg:'token no valido'
    });
    }

    next()
    
}

module.exports = {
    validarJWT
}
