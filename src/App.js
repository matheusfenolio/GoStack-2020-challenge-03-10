import React, { useState, useEffect } from "react";
import "./styles.css";

import api from "./services/api";

function App() {

  const [repositories, setRepositories] = useState([{}]);

  useEffect(() => {
	  api.get('repositories').then((response) => { 
		  if(Array.isArray(response.data)){
			setRepositories(response.data);
		  }
		});
  }, []);

  async function handleAddRepository() {	
	const response = await api.post('repositories', { 
		title: `Repository created at ${Date.now()}`,
		url:"https://github.com/matheusfenolio",
		techs:["test", "goStack", "Hello World"]
	});

	setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
	const response = await api.delete(`repositories/${id}`);	
	if(response.status === 204){
		setRepositories(repositories.filter(repository => repository.id !== id));
	}
  }

  return (
    <div>
      <ul data-testid="repository-list">
		  {
			  repositories.map(repository => (
					<li 
						key={`${repository.id}`}
					>
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
