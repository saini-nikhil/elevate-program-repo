import React from 'react';
import { Link } from 'react-router-dom';

const CharacterCard = ({character}) => {
  return (
    <div >
       <Link to={`/character/${character.id}`} target="_blank">
    <div className="card">
      <img src={character.image} alt={character.name} />
      <h3>{character.name}</h3>
      <p>{character.species}</p>
      <p>Status: {character.status}</p>
    </div>
  </Link>
      
    </div>
  );
}

export default CharacterCard;
