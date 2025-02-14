import React, { useState, useEffect } from 'react';
import './SearchPage.css';

const SearchPage = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTriggered, setSearchTriggered] = useState(false);

    useEffect(() => {
        if (query.length > 3) {
          setLoading(true);
          setSearchTriggered(true);
          fetch(`https://rickandmortyapi.com/api/character/?name=${query}`)
            .then((response) => response.json())
            .then((data) => {
              setResults(data.results || []);
              setLoading(false);
            })
            .catch(() => setLoading(false));
        } else {
          setResults([]);
          setSearchTriggered(false);
        }
      }, [query]);
    
    return (
        <div className="wrapper">
        <div className="container">
            <div className="top-input">
                <div className="input-body">
                    <input
                        className="input"
                        type="text"
                        placeholder="Search character..."
                        autoFocus
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                {searchTriggered && <p className="results-count">Found characters: {results.length}</p>}
                </div>
            </div>
        {loading && <p>Loading...</p>}
        <div className="results-grid">
            <div className="top-cards">
                {results.slice(0, 2).map((character) => (
                    <a key={character.id} href={character.url} className="card wide-card" target="_blank" rel="noopener noreferrer">
                        <p className="character-name name-bottom">{character.name} - {character.species}</p>
                        <div className="results-bottom">
                        <p className="status">Status: <span className={character.status.toLowerCase()}>{character.status}</span></p>
                            <p className="created-date">Created: {new Date(character.created).toLocaleDateString()}</p>
                        </div>
                    </a>
                ))}
            </div>

            <div className="bottom-cards">
                {results.slice(2).map((character) => (
                    <a key={character.id} href={character.url} className="card regular-card" target="_blank" rel="noopener noreferrer">
                        <p className="character-name">{character.name} - {character.species}</p>
                        <div className="results-bottom">
                            <p className="status">Status: <span className={character.status.toLowerCase()}>{character.status}</span></p>
                            <p className="created-date">Created: {new Date(character.created).toLocaleDateString()}</p>
                        </div>
                    </a>
                ))}
            </div>
        </div>
        </div>
      </div>
    );
  };
  
  export default SearchPage;
  
