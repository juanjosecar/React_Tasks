const express = require('express');
const cors = require('cors');
const app = express();


//settings 
//- configuraciones de nuestro servidor, un motor de plantilla,utilizar un puerto definido,aqui se definen variables qeu toda tu app pede tener acceso.
app.set('port', process.env.PORT || 4000);

//Middlewares 
// son funciones que se ejecutan antes que lleguen a las rutas
app.use(cors());
app.use(express.json());


//Routes
app.use('/api/users', require('./routes/users'))
app.use('/api/notes', require('./routes/notes'))


//Exportando el api
module.exports = app;