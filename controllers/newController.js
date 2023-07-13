const { New } = require('../models/newsModel')
const { Category } = require('../models/categoryModel')
const { User } = require('../models/userModel')
const { State } = require('../models/stateModel')
const { Profile } = require('../models/profileModel')
const { validationResult } = require('express-validator')

const relations = [
    {
        model: Category,
        attributes: ['id', 'nombre', 'descripcion'],
        as: 'categoria'
    },
    {
        model: User,
        attributes: ['id', 'nombre', 'apellidos', 'nick'],
        as: 'usuario',
        include: [
            {
                model: Profile,
                attributes: ['id', 'nombre'],
                as: 'perfil'
            }
        ]
    },
    {
        model: State,
        attributes: ['id', 'nombre', 'abreviacion'],
        as: 'estado'
    }
]
const get = (request, response) => {
    const { titulo, activo } = request.query
    const filters = {}

    if (titulo) {
        filters.titulo = titulo
    }

    if (activo) {
        filters.activo = activo
    }

    New.findAll({
        where: filters,
        include: relations,
    })
        .then(entities => {
            response.json(entities);
        })
        .catch(err => {
            console.log(err)
            response.status(500).send('Error consultando los datos');
        })
}

const getById = (request, response) => {
    const id = request.params.id;
    New.findByPk(id, {
        include: relations
    })
        .then(entitie => {
            if (entitie) {
                response.json(entitie);
            }
            else {
                response.status(404).send('Recurso no encontrado')
            }
        })
        .catch(err => {
            response.status(500).send('Error al consultar el dato');
        })
}

const create = (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(422).json({ errors: errors.array() })
    }
        New.create(request.body).then(
            newEntitie => {
                response.status(201).json(newEntitie)
            }
        )
            .catch(err => {
                response.status(500).send('Error al crear');
            })
        }

const update = (request, response) => {
    const id = request.params.id;
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(422).json({ errors: errors.array() })
    }
    New.update(
        request.body
        ,{
            where: {
                id: id
            }
        }
    )
        .then(updatedEntitie => {
            if (updatedEntitie[0]) {
                response.json(true);
            }
            else {
                response.status(404).send('Recurso no encontrado')
            }
        })
        .catch(err => {
            response.status(500).send('Error al actualizar');
        })
}

const remove = (request, response) => {
    const id = request.params.id;
    New.destroy({
        where: {
            id: id
        }
    })
        .then(deletedEntitie => {
            if (deletedEntitie) {
                response.json(true);
            }
            else {
                response.status(404).send('Recurso no encontrado')
            }
        })
        .catch(err => {
            response.status(500).send('Error al eliminar');
        })
}

module.exports = { get, getById, create, update, remove };