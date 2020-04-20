// esto lo que hace es que antes de que inicie todo voy a importar dichas variables de entorno.->
require('dotenv').config();

const app = require('./app');
 require('./database');


async function main(){
await app.listen(app.get('port'));
console.log('Server on port '+ app.get('port'));

}

main();