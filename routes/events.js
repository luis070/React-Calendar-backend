const { Router } = require("express")
const { validarJWT } = require("../middlewares/validar-jwt")
const {     getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento, } = require("../controllers/events");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { isDate } = require("../helpers/isDate");

const router = Router()

// todas tienes que pasar por la validacion de token
// obtener eventos 

// como se usaba en todos se puede poner como a continuacion para ejecutarse 
router.use(validarJWT);

router.get('/',  getEventos)

// obtener eventos 
router.post('/', [
    check('title' , 'el titulo es obligatorio').not().isEmpty(),
    check('start' , 'la fecha inicial es obligatoria').custom(isDate),
    check('end' , 'la fecha final es obligatoria').custom(isDate),
    validarCampos
], crearEvento) 

router.put('/:id', actualizarEvento)

router.delete('/:id',  eliminarEvento)

module.exports = router