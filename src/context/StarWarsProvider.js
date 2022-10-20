import React, { createContext, useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';

const defaultValue = [];

export const planetsContext = createContext(defaultValue);

export function StarWarsProvider({ children }) {
  const [planetsList, setPlanetsList] = useState([]);
  const [filterByName, setfilterByName] = useState('');
  const [filtersByNumber, setfiltersByNumber] = useState({
    column: 'population',
    comparison: 'maior que',
    value: '',
  });

  const handleFilter = ({ target }) => {
    const { name, value } = target;
    setfiltersByNumber((oldState) => ({ ...oldState, [name]: value }));
  };

  useEffect(() => {
    const starWarsAPI = async () => {
      const url = 'https://swapi.dev/api/planets';
      const response = await fetch(url);
      const { results } = await response.json();
      const data = results.filter((planet) => delete planet.residents);
      setPlanetsList(data);
    };
    starWarsAPI();
  }, []);

  const handleChange = ({ target }) => {
    const { value } = target;
    setfilterByName(value);
  };

  const clickFilter = () => {
    if (comparison === 'maior que') {
      const filteredPlanets = planetsList.filter((filter) => +filter[column] > +value);
      setPlanetsList(filteredPlanets);
    }
    if (comparison === 'menor que') {
      const filteredPlanets = planetsList.filter((filter) => +filter[column] < +value);
      setPlanetsList(filteredPlanets);
    }
    if (comparison === 'igual A') {
      const filteredPlanets = planetsList.filter((filter) => +filter[column] === +value);
      setPlanetsList(filteredPlanets);
    }
  };

  const planets = useMemo(
    () => ({ planetsList,
      filterByName,
      handleChange,
      filtersByNumber,
      handleFilter,
      clickFilter }),
    [planetsList, filterByName, filtersByNumber],
  );

  return (
    <planetsContext.Provider value={ planets }>
      {children}
    </planetsContext.Provider>
  );
}

StarWarsProvider.propTypes = {
  children: PropTypes.shape(),
}.isRequired;
