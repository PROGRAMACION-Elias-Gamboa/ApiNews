const { User } = require('../models/userModel')
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const login = (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(422).json({ errors: errors.mapped() });
    }
    User.findOne({
        where: {
            correo: request.body.correo,
            contraseña: request.body.contraseña,
            activo: true
        },
        attributes: ['id', 'nombre', 'apellidos', 'nick', 'correo', 'perfil_id']
    }).then(entitie => {
            if (entitie) {
                const token = jwt.sign({ entitie }, 'secret', { expiresIn: '1h' });
                response.status(201).json({message: "Login con éxito", token: token});
            }
            else {
                response.status(401).json({message: "Sin autorización"});

            }
        })
        .catch(err => {
            response.status(500).send('Error al consultar el dato');
        })
}

const register = (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(422).json({ errors: errors.mapped() });
    }
    request.body.perfil_id = 2
    request.body.status = true

    User.create(request.body).then(
        newEntitie => {
            response.status(201).json(newEntitie)
        }
    )
        .catch(err => {
            response.status(500).send('Error al crear');
        })
}

module.exports = {
    login,
    register,
};