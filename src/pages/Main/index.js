import React, { Component } from "react";
import api from "../../services/api";
import moment from "moment";

import { Container, Form } from "./styles";

import logo from "../../assets/logo.png";

import CompareList from "../../components/CompareList";

const setLocalRepo = lista => {
  localStorage.setItem("repositorios", JSON.stringify(lista));
};

const getLocalrepo = () => JSON.parse(localStorage.getItem("repositorios"));

export default class Main extends Component {
  state = {
    loading: false,
    repositoryInput: "",
    repositories: getLocalrepo()
  };

  handleAddRepository = async e => {
    e.preventDefault();
    this.setState({ loading: true });

    try {
      const { data: repository } = await api.get(
        `/repos/${this.state.repositoryInput}`
      );

      repository.lastCommit = moment(repository.pushed_at).fromNow();

      this.setState({
        repositoryInput: "",
        repositoryError: false,
        repositories: [...this.state.repositories, repository]
      });
      setLocalRepo(this.state.repositories);
      console.log(getLocalrepo());
    } catch (error) {
      this.setState({ repositoryError: true });
    } finally {
      this.setState({ loading: false });
    }
  };

  removeRepo = async id => {
    const { repositories } = this.state;
    const updatedRepos = repositories.filter(repo => repo.id !== id);

    this.setState({ repositories: updatedRepos });
    setLocalRepo(updatedRepos);
  };

  attRepo = async repoName => {
    const { repositories } = this.state;
    try {
      const updatedRepos = await api.get(`/repos/${repoName}`);

      updatedRepos.lastCommit = moment(updatedRepos.data.pushed_at).fromNow();

      this.setState({
        repositoryError: false,
        repositoryInput: "",
        repositories: repositories.map(repo =>
          repo.id === updatedRepos.data.id ? repo : updatedRepos.data
        )
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <Container>
        <img src={logo} alt="Github Compare" />
        ''
        <Form
          withError={this.state.repositoryError}
          onSubmit={this.handleAddRepository}
        >
          <input
            type="text"
            placeholder="Usuário/Repositório"
            value={this.state.repositoryInput}
            onChange={e => this.setState({ repositoryInput: e.target.value })}
          />
          <button type="submit">
            {this.state.loading ? (
              <i className="fa fa-spinner fa-pulse" />
            ) : (
              "OK"
            )}
          </button>
        </Form>
        <CompareList
          repositories={this.state.repositories}
          removeRepo={this.removeRepo}
          attRepo={this.attRepo}
        />
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
