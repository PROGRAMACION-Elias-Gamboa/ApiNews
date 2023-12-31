var express = require('express');

const { get, getById, create, update, destroy } = require('../controllers/userController');
const { authenticateAdmin } = require('../middlewares/jwt');
const api = express.Router();

api.get('/usuarios', authenticateAdmin, get);
api.get('/usuarios/:id',authenticateAdmin, getById)
api.post('/usuarios',authenticateAdmin, create)
api.put('/usuarios/:id',authenticateAdmin, update)
api.delete('/usuarios/:id',authenticateAdmin, destroy)


module.exports = api;