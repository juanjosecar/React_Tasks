const {Schema, model} = require('mongoose');

const userSchema = new Schema(
    {
username:
{
 type: String,
 required: true,
 trim: true, // esto limpia el string elminando los espacios etc
 unique:true
}
},
{
   timestamps: true
}
);


//esto de aqui se encarga de crear la coleccion user->
module.exports = model('user',userSchema);