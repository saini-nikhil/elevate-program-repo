import React, { use, useState , useEffect } from 'react';
import CharacterCard from "../componets/CharacterCard";
import FooterClock from '../componets/FooterClock';

const CharacterGallery = () => {
    const [characters, setCharacters] = useState([]);
    const [page , setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const fetchCharacters = async () => {
        setLoading(true);
        try {
            const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
            const data = await response.json();
            setCharacters(data.results);
        } catch (error) {
            console.error("Error fetching characters:", error);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchCharacters();
    }
    , [page]);
  return (
    <div>
     
        <div className="grid">
        {characters.map((char) => (
          <CharacterCard key={char.id} character={char} />
        ))}
      </div>
      <div className="pagination">
        <button onClick={() => setPage((p) => Math.max(p - 1, 1))}>Previous</button>
        <button onClick={() => setPage((p) => p + 1)}>Next</button>
      </div>
      <FooterClock />
    </div>
      
   
  );
}

export default CharacterGallery;
