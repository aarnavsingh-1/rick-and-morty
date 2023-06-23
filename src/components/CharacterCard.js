import React from 'react';
import { Card } from 'antd';
import { Link } from 'react-router-dom';

const { Meta } = Card;

const CharacterCard = ({ character }) => {
  return (
    <Link to={`/characters/${character.id}`}>
      <Card
        hoverable
        style={{ width: 240, marginBottom: '16px' }}
        cover={<img alt={character.name} src={character.image} />}
      >
        <Meta title={character.name} description={`Status: ${character.status}, Gender: ${character.gender}`} />
      </Card>
    </Link>
  );
};

export default CharacterCard;
