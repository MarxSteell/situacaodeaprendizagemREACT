import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor() {
    super();

    this.state = {
      lista: [],
      nome: ""
    }

    this.atualizaEstadoNomeUsuario = this.atualizaEstadoNomeUsuario.bind(this);
  }

  atualizaEstadoNomeUsuario(event) {
    this.setState({ nome: event.target.value });
  }

  buscarRepositorios(event) {
    event.preventDefault();
    fetch("https://api.github.com/users/" + this.state.nome + "/repos?client_id=&client_secret=")
      .then(resposta => resposta.json())
      .then(data => this.setState({ lista: data }))
      .catch(erro => console.log(erro))
  }

  render() {
    return (
      <div>
        <form>
        <input
          type="text"
          value={this.state.nome}
          onChange={this.atualizaEstadoNomeUsuario}
          placeholder="Nome do Usuário"
        >
        </input>
        <button className="btnearchUser" onClick={this.buscarRepositorios.bind(this)}>Buscar</button>
        </form>
        <ul>
          {this.state.lista.map(function Listar(element) {
            return (
              <li>{element.id} - {element.name} - {element.description} - {element.created_at} - {element.size}</li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default App;
