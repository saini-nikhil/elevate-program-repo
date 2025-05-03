import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FooterClock from '../componets/FooterClock';

const CharacterDetail = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character/${id}`)
      .then(res => res.json())
      .then(data => setCharacter(data));
  }, [id]);

  if (!character) return <div>Loading...</div>;

  return (
    <div id='character-detail'>
      <h2>Character Details</h2>
      <h1>{character.name}</h1>
      <img src={character.image} alt={character.name} />
      <ul>
        <li>Status: {character.status}</li>
        <li>Species: {character.species}</li>
        <li>Type: {character.type || "N/A"}</li>
        <li>Gender: {character.gender}</li>
        <li>Origin: {character.origin.name}</li>
        <li>Location: {character.location.name}</li>
        <li>Episodes: {character.episode.length}</li>
      </ul>
      <FooterClock />
    </div>
  );
};

export default CharacterDetail;
