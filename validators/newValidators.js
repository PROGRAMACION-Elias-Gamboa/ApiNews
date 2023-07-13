const {check} = require('express-validator');
const {New} = require('../models/newsModel');

const validatorNewRequire = [
    check('categoria_id').notEmpty().withMessage('El campo categoria_id es obligatorio').isInt().withMessage('El campo categoria_id debe ser un numero entero'),
    check('usuario_id').notEmpty().withMessage('El campo usuario_id es obligatorio').isInt().withMessage('El campo usuario_id debe ser un numero entero'),
    check('estado_id').notEmpty().withMessage('El campo estado_id es obligatorio').isInt().withMessage('El campo estado_id debe ser un numero entero'),
    check('titulo').notEmpty().withMessage('El campo titulo es obligatorio').isLength({min:2}).withMessage('El campo titulo debe tener al menos 2 caracteres'),
    check('descripcion').notEmpty().withMessage('El campo descripcion es obligatorio').isLength({min:2}).withMessage('El campo descripcion debe tener al menos 2 caracteres'),
];

const validatorNewOptional = [
    check('imagen').optional().isString().withMessage('El campo imagen debe ser una imagen en base64'),
    check('activo').optional().isBoolean().withMessage('El campo activo debe ser un booleano'),
];

module.exports = {
    validatorNewRequire,
    validatorNewOptional
}