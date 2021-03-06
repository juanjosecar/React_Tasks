import React, { Component } from "react";
import axios from "axios"; // biblioteca para poder obtener los datos de nuestra api

export default class CreateUser extends Component {
  state = {
    users: [],
    username: ""
  };

  //este metodo ejececuta instrucciones apenas el componente se monte.
  async componentDidMount() {
   this.getUser();
    console.log(this.state.users);
  }


  //metodo que obtiene los usaurios a traves de axios
getUser = async ()=>{
    const res = await axios.get("http://localhost:4000/api/users/");
    this.setState({ users: res.data });
}


  onChangeUsername = e => {
    this.setState({
      username: e.target.value
    });
    //   console.log(e.target.value);
  };



  onSubmit = async e =>{
      e.preventDefault();// con esto evitamos que el formulario por defecto refresque la pagina con el boton
     await axios.post('http://localhost:4000/api/users/',{
         username : this.state.username
     })
     this.setState({username:''});
   this.getUser();

  }

// metodo para eliminar un dato
deleteUser = async (id) =>{
    await axios.delete('http://localhost:4000/api/users/' + id);
   this.getUser();

};


  render() {
    return (
      <div className="row">
        <div className="col-md-4">
          <div className="card card-body">
            <h3>Create New User</h3>

            {/* formulario  */}
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  value={this.state.username}
                  onChange={this.onChangeUsername}
                />
              </div>
              <button className="btn btn-primary" type="submit">Save</button>
            </form>
            {/* fin de formulario */}
          </div>
        </div>
        <div className="col-md-8">
          <ul className="list-group">
            {this.state.users.map(user => (
              <li
                className="list-group-item list-group-item-action"
                key={user._id}
                onDoubleClick={()=> this.deleteUser(user._id)}
                  >
                {user.username}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
