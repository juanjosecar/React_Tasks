const {Schema, model} = require('mongoose');

const noteSchema = new Schema(
    {
title: String ,
content: {type: String , required: true},
author : String,
date  : {
    type : Date,
    default: Date.now
}


},
{
   timestamps: true
}
);

//esto de aqui se encarga de crear la coleccion note->
module.exports = model('note',noteSchema);