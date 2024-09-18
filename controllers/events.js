const { response } = require("express");

const Evento = require ('../models/Evento')

const getEventos = async(req, res= response) =>{

    const eventos = await Evento.find( )
                                .populate('user', 'name')

    res.json({
        ok: true,
        eventos
    })
}


const crearEvento = async (req, res= response)=>{
// verifico la informacion
// console.log(req.body); 

    const evento = new Evento (req.body);

    try {
        evento.user = req.uid;

        const eventoGuardado = await evento.save()
        res.json({
            ok:true,
            evento: eventoGuardado
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json ({
            ok:false,
            msg:'hable con el administrador'
        })
        
    }



    // res.json({
    //     ok: true,
    //     msg: 'crearEvento'
    // })
} 

const actualizarEvento = async(req, res= response) =>{

// console.log(req.uid); 
    const eventoId =  req.params.id; 
    const uid = req.uid;

    try {

        const evento = await Evento.findById(eventoId)
        
        if(!evento){
            res.status(404).json({
                ok:false,
                msg: 'evento no existe por ese id'
            });
        }

        if(evento.user.toString() !== uid){
            return res.status(401).json ({
                ok:false, 
                msg:'no pertenece el archivos'
            })
        }

        // esto es para actualizar lo que se va a enviar con el uid 
        const nuevoEvento = { 
            ...req.body,
            user:uid,
        }
        // con esto es para que nos regrese el valor ya actualizado {new:true}
        const eventoActualizado = await Evento.findByIdAndUpdate (eventoId, nuevoEvento, {new:true})



        res.json({
            ok: true,
           evento: eventoActualizado
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'hable con el administrador'
        })
        
    }
}

const eliminarEvento = async (req, res = response) =>{
    const eventoId =  req.params.id; 
    const uid = req.uid;

    try {

        const evento = await Evento.findById(eventoId)
        
        if(!evento){
            res.status(404).json({
                ok:false,
                msg: 'evento no existe por ese id'
            });
        }

        if(evento.user.toString() !== uid){
            return res.status(401).json ({
                ok:false, 
                msg:'no pertenece el archivos'
            })
        }

        // con esto es para que nos regrese el valor ya actualizado {new:true}
        await Evento.findByIdAndDelete(eventoId)



        res.json({
            ok: true,
            msg:'se elimino correctamente '
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'hable con el administrador no se puede eliminar'
        })
        
    }
}

module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento,
}

// {
//     ok: true, 
//     msg: 'getEvent'
// }


// {
//     ok:true,
//     msg: 'crearEventos'
// }


// {
//     ok:true,
//     msg: 'actualizrEvento'
// }

// {
//     ok:true,
//     msg: 'eliminarEvento'
// }