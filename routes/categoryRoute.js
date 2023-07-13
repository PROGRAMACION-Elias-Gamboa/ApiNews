var express = require('express');

const {get, getById, create, update, destroy}  = require('../controllers/categoryController');
const { authenticateAdmin } = require('../middlewares/jwt');
const api = express.Router();

api.get('/categorias', get);
api.get('/categorias/:id', getById)
api.post('/categorias', authenticateAdmin, create)
api.put('/categorias/:id', authenticateAdmin, update)
api.delete('/categorias/:id', authenticateAdmin, destroy)


module.exports = api;