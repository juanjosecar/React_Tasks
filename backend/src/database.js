const mongoose = require('mongoose');


//process es un objeto de javaS q tiene acceso a todo el S.O , es una objeto global de node.js
console.log(process.env.MONGODB_URI)
const URI = process.env.MONGODB_URI 
//aqui hacemos una validacion con un iterador ternario ? '' :''; es cual es una condicional de una sola linea
? process.env.MONGODB_URI : 'mongodb://localhost/databasetest';

//aqui vamos a tener una cadena de conexion, es decir creando una conexion con la db
mongoose.connect(URI,{
    //este objeto lo que hace es que la conexion no marque error, por asi decirlo.
    useNewUrlParser : true,
    useCreateIndex: true ,
     useUnifiedTopology: true,//Para usar el nuevo motor de Descubrimiento y monitoreo del servidor, pase la opción {useUnifiedTopology: true} al constructor MongoClient.
     useFindAndModify:false
}
    );

    //cuando se conecte quiero escuchar esa conexion lo hacemos con el sgte codigo
    const connection = mongoose.connection;


    //luego una vez sea abierta la conexion quiero que muestres por consola lo siguiente.
    connection.once('open', ()=>{
        console.log('Database is connected')
    });