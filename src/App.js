import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories')
      .then( response => {
        setRepositories(response.data);
      })
      .catch( reason => {
        console.log(`Error: ${reason}`);
      })
  }, []);

  async function handleAddRepository() {
    const repository = {
      title: 'New repository', 
      url: 'https://newrepository.com.br', 
      techs: [
        'ReactJS',
        'C#'
      ]
    };

    api.post('repositories', repository)
      .then( response => {
        if (response.status === 200)
          addRepositoryToList(response.data);
      })
      .catch( reason => {
        console.log(`Error: ${reason}`)
      });
  }

  function addRepositoryToList(repository) {
    const newRepositories = [...repositories, repository];
    setRepositories(newRepositories);
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`)
      .then( response => {
        if (response.status === 204)
          removeRepositoryFromList(id);
      })
      .catch( reason => {
        console.log(`Error: ${reason}`);
      })
  }

  function removeRepositoryFromList(id) {
    const repositoriesFiltered = repositories.filter(repository => repository.id !== id);
    setRepositories(repositoriesFiltered);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(repository => (
            <li key={repository.id}>
              {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
          ))
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
