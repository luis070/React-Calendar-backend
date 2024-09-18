

const { generarJWT } = require('../helpers/jwt');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');



const crearUsuario = async(req, res)=>{

    // con esto podemos ver la informaicon que se envia a .jsonen el post en el cuerpo 
    // console.log(req.body);

    const {name, email, password} = req.body;

    // esto lo remplazamos con el express validtor 
    // if(name.length < 5){
    //     return res.status(400).json({
    //         ok:false,
    //         msg: 'el nombre debe de ser de 5 letras'
    //     })

    // }

// lo cambiamos y lo ponemos en el middlewarees validar campos
    // const error = validationResult( req);
    // // console.log(error);
    // if (!error.isEmpty()) {
    //     return res.status(400).json({
    //         ok: false,
    //         error: error.mapped()
    //     })        
    // }
    

    try {
        let usuario = await Usuario.findOne({email});
        console.log(usuario);
        if (usuario) {
            return res.status(400).json({
                ok:false,
                msg:'un usuario existe'
            })            
        }

        usuario = new Usuario( req.body )

        // encriptar la contraseña
        const salt = bcrypt.genSaltSync()
        usuario.password= bcrypt.hashSync(password,salt)


        await usuario.save();

        // generar jwt
        const token = await generarJWT( usuario.id, usuario,name);

    
        res.status(201).json({
            ok:true,
            msg: 'nuevo',
            uid: usuario.id,
            name: usuario.name,
            token
            // name,
            // email,
            // password,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'por favor hable con el administrador'
        })
        
    }


}


const loginUsuario = async(req, res)=>{
    const { email, password} = req.body;

try {  
    const usuario = await Usuario.findOne({email});

    if (!usuario) {
        return res.status(400).json({
        ok:false,
        msg:'un correo que no existe'
        })            
    }

    const validarPassword = bcrypt.compareSync( password, usuario.password);
    // console.log(validarPassword);
    
    if (!validarPassword) {
        return res.status(400).json({
            ok:false,
            msg:'la contraseña esta mal'
            }) 
    }
// validar token
    const token = await generarJWT( usuario.id, usuario.name);

    res.status(201).json({
        ok:true,
        msg: 'nuevo',
        uid: usuario.id,
        name: usuario.name,
        token
    })

    
} catch (error) {
    console.log(error);
    res.status(500).json({
        ok:false,
        msg: 'por favor hable con el administrador'
    })
}
}

const revalidarToken = async(req, res)=>{ 
    const uid = req.uid
    const name = req.name

    // genera un nuevo jwt y retornarlo en esta peticion 

    const token = await generarJWT( uid, name);

    res.json({
        ok:true,
        token
    })
}


module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken,
}

