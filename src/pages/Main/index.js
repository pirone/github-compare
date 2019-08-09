import React, { Component } from "react";
import api from "../../services/api";

import { Container, Form } from "./styles";

import logo from "../../assets/logo.png";

import CompareList from "../../components/CompareList";

export default class Main extends Component {
  state = {
    repositoryInput: "",
    repositories: []
  };

  handleAddRepository = async e => {
    e.preventDefault();

    try {
      const response = await api.get(`/repos/${this.state.repositoryInput}`);

      this.setState({
        repositoryInput: "",
        repositories: [...this.state.repositories, response.data]
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <Container>
        <img src={logo} alt="Github Compare" />

        <Form onSubmit={this.handleAddRepository}>
          <input
            type="text"
            placeholder="Usuário/Repositório"
            value={this.state.repositoryInput}
            onChange={e => this.setState({ repositoryInput: e.target.value })}
          />
          <button type="submit">OK</button>
        </Form>
        <CompareList repositories={this.state.repositories} />
      </Container>
    );
  }
}

// const Main = () => (
//   <Container>
//     <img src={logo} alt="Github Compare" />

//     <Form>
//       <input type="text" placeholder="Usuário/Repositório" />
//       <button type="submit">OK</button>
//     </Form>
//     <CompareList repositories={this.state.repositories}/>
//   </Container>
// );

// export default Main;
