const express = require('express');

const { get, getById, create, update, remove } = require('../controllers/newController');
const { validatorNewRequire, validatorNewOptional } = require('../validators/newValidators');
const { authenticateAny } = require('../middlewares/jwt');
const api = express.Router();

api.get('/news', get);
api.get('/news/:id', getById)
api.post('/news', authenticateAny, validatorNewRequire, validatorNewOptional,create)
api.put('/news/:id', authenticateAny, validatorNewOptional, update)
api.delete('/news/:id', authenticateAny, remove)

module.exports = api;