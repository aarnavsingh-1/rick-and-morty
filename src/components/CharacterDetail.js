import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from 'antd';
import axios from 'axios';

const { Meta } = Card;

const CharacterDetail = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
        setCharacter(response.data);
      } catch (error) {
        console.error('Error fetching character:', error);
      }
    };

    fetchCharacter();
  }, [id]);

  if (!character) {
    return <div>Loading...</div>;
  }

  return (
    <Card
      hoverable
      style={{ width: 240, marginBottom: '16px' }}
      cover={<img alt={character.name} src={character.image} />}
    >
      <Meta title={character.name} description={`Status: ${character.status}, Gender: ${character.gender}`} />
      <div style={{ marginTop: '16px' }}>
        <strong>Species:</strong> {character.species}
      </div>
      <div>
        <strong>Origin:</strong> {character.origin.name}
      </div>
      <div>
        <strong>Location:</strong> {character.location.name}
      </div>
    </Card>
  );
};

export default CharacterDetail;

