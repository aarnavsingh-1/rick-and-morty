import React, { useState, useEffect } from 'react';
import { Card, Input, Select } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom';

const { Meta } = Card;
const { Option } = Select;

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [genderFilter, setGenderFilter] = useState('');

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await axios.get('https://rickandmortyapi.com/api/character');
        setCharacters(response.data.results);
      } catch (error) {
        console.error('Error fetching characters:', error);
      }
    };

    fetchCharacters();
  }, []);

  const handleNameFilterChange = (e) => {
    setNameFilter(e.target.value);
  };

  const handleStatusFilterChange = (value) => {
    setStatusFilter(value);
  };

  const handleGenderFilterChange = (value) => {
    setGenderFilter(value);
  };

  const filteredCharacters = characters.filter((character) => {
    const nameMatch = character.name.toLowerCase().includes(nameFilter.toLowerCase());
    const statusMatch = statusFilter === '' || character.status === statusFilter;
    const genderMatch = genderFilter === '' || character.gender === genderFilter;

    return nameMatch && statusMatch && genderMatch;
  });
  const hasNoResults = filteredCharacters.length === 0;

  return (
    <div className="character-list-container">
      <div className="filter-container">
        <Input
          placeholder="Search by name"
          value={nameFilter}
          onChange={handleNameFilterChange}
          style={{ width: 200, marginRight: 16 }}
        />
        <Select
          placeholder="Status"
          value={statusFilter}
          onChange={handleStatusFilterChange}
          style={{ width: 120, marginRight: 16 }}
        >
          <Option value="">All</Option>
          <Option value="Alive">Alive</Option>
          <Option value="Dead">Dead</Option>
          <Option value="unknown">Unknown</Option>
        </Select>
        <Select
          placeholder="Gender"
          value={genderFilter}
          onChange={handleGenderFilterChange}
          style={{ width: 120 }}
        >
          <Option value="">All</Option>
          <Option value="Male">Male</Option>
          <Option value="Female">Female</Option>
          <Option value="Genderless">Genderless</Option>
          <Option value="unknown">Unknown</Option>
        </Select>
      </div>
      <div className="character-list">
        {hasNoResults?(<div className='no-results'>No Results Found!!</div>):(
            filteredCharacters.map((character) => (
                <Link to={`/characters/${character.id}`}>
              <Card
                key={character.id}
                hoverable
                className="character-card"
                cover={<img alt={character.name} src={character.image} />}
              >
               
                <Meta title={character.name} description={`Status: ${character.status}, Gender: ${character.gender}`} />
              
              </Card>
              </Link>
            ))
        )}
        
      </div>
    </div>
  );
};

export default CharacterList;
