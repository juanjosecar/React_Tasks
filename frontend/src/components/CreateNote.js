import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'

import axios from 'axios'


export default class CreateNote extends Component {

    state={
        users:[],
        userSelected:'',
        title:'',
        content:'',
        date:new Date(),
     editing: false ,// esta propiedad es para saber si el component va a actualizar o va crear 
     _id: '' // aqui se va a gaurdar el id que viene dethis.props.match.params.id si va a editar
    }

async    componentDidMount(){
const res= await axios.get('http://localhost:4000/api/users');
this.setState({users:res.data.map(user=>user.username), // esta obtiene nada mas el username de los usuarios
 userSelected: res.data[0].username // con esto decimosc que por defecto el userSelected va a ser el primer user   
});

if(this.props.match.params.id){
    const res= await axios.get('http://localhost:4000/api/notes/' + this.props.match.params.id);
console.log(res.data);
    this.setState({
        title:res.data.title,
        content: res.data.content,
        date:new Date(res.data.date),
        userSelected:res.data.userSelected,
        editing: true,
     _id:res.data._id
    });
}


 }



onSubmit = async (e)=>{
    // console.log(this.state.userSelected,this.state.title,this.state.content);
e.preventDefault();
 const newNote = {
     title: this.state.title,
     content: this.state.content,
     date: this.state.date,
     author:this.state.userSelected
 };
 console.log(newNote);


 if(this.state.editing){
   await axios.put('http://localhost:4000/api/notes/' + this.state._id, newNote);
   console.log('si entra');
 }else{
    await  axios.post('http://localhost:4000/api/notes', newNote);
 }
 window.location.href='/';

}


onInputChange = e=>{
// console.log(e.target.value); //aqui obtenemos el valor selecionado del selecte y los mostramos por consola
//this.setState({userSelected:e.target.value })
//otra forma de chacerlo para que funciones en todos seria asi ->

this.setState({
    
    [e.target.name]:e.target.value
})
}

onChangeDate= date =>{
    this.setState({
        date
    }); 
    //con este metodo cada que el usuario selecione una fecha en el datepicker se reflejara el cambio
}


    render() {
        return (
           <div className="col-md-6 offset-3">
               <div className="card card-body">
                   <h4>Create a Note</h4>
                 
                   <form onSubmit={this.onSubmit}>
                         {/* Select para el usuario */}
                   <div className="form-group">

                           <select 
                           className="form-control" 
                           value={this.state.userSelected}
                          onChange ={this.onInputChange}
                           name="userSelected" 
                            required>

                         {this.state.users.map(user=>
                              
                    <option value={user} key={user}> {user} </option>)}
                           </select>
                       </div>
                       {/* text */}
                  <div className="form-group">
                      <input 
                      type="text"
                      placeholder="title"
                      className="form-control"
                      name="title"
                      value={this.state.title}
                      required
                      onChange ={this.onInputChange}
                      />
                       </div>

                            {/* text area */}
                       <div className="form-group">
                           <textarea 
                           className="form-control"
                           placeholder="Content"
                           name="content"
                           onChange ={this.onInputChange}
                      value={this.state.content}

                           required>

                           </textarea>
                       </div>

                       <div className="form-group">
                           <DatePicker
                           className="form-control"
                           selected={this.state.date}
                           onChange={this.onChangeDate}

                           />
                       </div>


                       <button className="btn btn-primary" >Save</button>

                   </form>
               </div>

           </div>
        
        )
    }
}
