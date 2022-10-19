import React, { useContext } from 'react';
import { planetsContext } from '../context/StarWarsProvider';

export default function Header() {
  const { filterByName, handleChange } = useContext(planetsContext);
  return (
    <header>
      <h1> Projeto Star Wars - Trybe</h1>
      <input
        data-testid="name-filter"
        type="text"
        value={ filterByName }
        onChange={ handleChange }
        placeholder="Filter By Name"
      />
    </header>
  );
}
