import React, { createContext, useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';

const defaultValue = [];

export const planetsContext = createContext(defaultValue);

export function StarWarsProvider({ children }) {
  const [planetsList, setPlanetsList] = useState([]);

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

  const planets = useMemo(() => ({ planetsList }), [planetsList]);

  return (
    <planetsContext.Provider value={ planets }>
      {children}
    </planetsContext.Provider>
  );
}

StarWarsProvider.propTypes = {
  children: PropTypes.shape(),
}.isRequired;