import React, { createContext, useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';

const defaultValue = [];

export const planetsContext = createContext(defaultValue);

export function StarWarsProvider({ children }) {
  const [planetsList, setPlanetsList] = useState([]);
  const [filterByName, setfilterByName] = useState('');
  const [columnOptions, setColumnOptions] = useState(['population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water']);

  const INITIAL_FILTER = {
    column: columnOptions[0],
    comparison: 'maior que',
    value: 0,
  };
  const [filtersByNumber, setfiltersByNumber] = useState(INITIAL_FILTER);
  const [activeFilters, setActiveFilters] = useState([]);

  const handleFilter = ({ target }) => {
    const { name, value } = target;
    setfiltersByNumber((oldState) => ({ ...oldState, [name]: value }));
  };

  const newColumns = () => {
    activeFilters.forEach((element) => setColumnOptions(columnOptions.filter(
      (item) => item !== element.column,
    )));
  };

  const newColumnsa = (element) => {
    console.log('colunas', columnOptions);
    const colunas = columnOptions.splice(columnOptions.indexOf(element), 0);
    console.log('AAAA', colunas);
    setColumnOptions(colunas);
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
    console.log(columnOptions);
  }, []);

  const filtering = () => {
    const { comparison, column, value } = filtersByNumber;
    if (comparison === 'maior que') {
      const filteredPlanets = planetsList.filter((filter) => +filter[column] > +value);
      setPlanetsList(filteredPlanets);
    }
    if (comparison === 'menor que') {
      const filteredPlanets = planetsList.filter((filter) => +filter[column] < +value);
      setPlanetsList(filteredPlanets);
    }
    if (comparison === 'igual a') {
      const filteredPlanets = planetsList.filter(
        (filter) => +filter[column] === +value,
      );
      setPlanetsList(filteredPlanets);
    }
  };

  useEffect(() => {
    filtering();
    newColumns();
  }, [activeFilters]);

  const handleChange = ({ target }) => {
    const { value } = target;
    setfilterByName(value);
  };

  const clickFilter = () => {
    setActiveFilters([...activeFilters, filtersByNumber]);
  };

  const planets = useMemo(
    () => ({ planetsList,
      filterByName,
      handleChange,
      filtersByNumber,
      handleFilter,
      clickFilter,
      activeFilters,
      columnOptions }),
    [planetsList, filterByName, filtersByNumber, activeFilters, columnOptions],
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
