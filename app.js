const express = require('express')
const app = express();
const cors = require('cors');
const {PORT} = require('./config')

app.use(cors());
app.use(express.json({limit: '5mb'}));

//Exportar Rutas
const profile_routes = require('./routes/profileRoute');
const state_routes = require('./routes/stateRoute');
const category_routes = require('./routes/categoryRoute');
const new_routes = require('./routes/newRoute');
const user_routes = require('./routes/userRoute');
const auth_routes = require('./routes/authRoute');



//Usar las rutas
app.use('/api', profile_routes, state_routes, category_routes, new_routes, user_routes, auth_routes)

app.listen(PORT, () => {
    console.log('Servidor escuchando en el puerto ' + PORT);
});

module.exports = app;