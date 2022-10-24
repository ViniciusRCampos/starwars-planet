import React, { createContext, useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';

const defaultValue = [];

export const planetsContext = createContext(defaultValue);

export function StarWarsProvider({ children }) {
  const INITIAL_OPTIONS = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];
  const [APIData, setAPIData] = useState([]);
  const [planetsList, setPlanetsList] = useState([]);
  const [filterByName, setfilterByName] = useState('');
  const [columnOptions, setColumnOptions] = useState(INITIAL_OPTIONS);

  const INITIAL_FILTER = {
    column: columnOptions[0],
    comparison: 'maior que',
    value: 0,
  };
  const [filtersByNumber, setfiltersByNumber] = useState(INITIAL_FILTER);
  const [activeFilters, setActiveFilters] = useState([]);
  // const [sortOptions, setSortOptions] = useState(INITIAL_OPTIONS);
  const INITIAL_SORT = {
    sortColumn: 'population',
    order: 'ASC',
  };
  const [sorted, setSorted] = useState(INITIAL_SORT);

  const handleFilter = ({ target }) => {
    const { name, value } = target;
    setfiltersByNumber((oldState) => ({ ...oldState, [name]: value }));
  };

  const handleSort = ({ target }) => {
    const { name, value } = target;
    setSorted((oldState) => ({ ...oldState, [name]: value }));
  };

  useEffect(() => {
    const starWarsAPI = async () => {
      const url = 'https://swapi.dev/api/planets';
      const response = await fetch(url);
      const { results } = await response.json();
      const data = results.filter((planet) => delete planet.residents);
      setAPIData(data);
      setPlanetsList(data);
    };
    starWarsAPI();
  }, []);

  const filtering = () => {
    activeFilters.forEach((filter) => {
      if (filter.comparison === 'maior que') {
        const filterValue = planetsList.filter(
          (element) => Number(element[filter.column]) > Number(filter.value),
        );
        setPlanetsList(filterValue);
      }
      if (filter.comparison === 'menor que') {
        const filterValue = planetsList.filter(
          (element) => Number(element[filter.column]) < Number(filter.value),
        );
        setPlanetsList(filterValue);
      }
      if (filter.comparison === 'igual a') {
        const filterValue = planetsList.filter(
          (element) => Number(element[filter.column]) === Number(filter.value),
        );
        setPlanetsList(filterValue);
      }
    });
  };

  useEffect(() => {
    filtering();
    setfiltersByNumber((oldState) => ({
      ...oldState,
      column: columnOptions[0],
    }));
  }, [activeFilters]);

  const handleChange = ({ target }) => {
    const { value } = target;
    setfilterByName(value);
  };

  const clickFilter = () => {
    setActiveFilters([...activeFilters, filtersByNumber]);
    const newOption = columnOptions.filter(
      (column) => column !== filtersByNumber.column,
    );
    setColumnOptions(newOption);
  };

  const removeFilter = ({ target }) => {
    const { value } = target;
    setColumnOptions([...columnOptions, value]);
    setPlanetsList(APIData);
    const deleteFilter = activeFilters.filter(
      (element) => element.column !== value,
    );
    setActiveFilters(deleteFilter);
  };

  const clearFilter = () => {
    setActiveFilters([]);
    setColumnOptions(INITIAL_OPTIONS);
    setPlanetsList(APIData);
  };

  const sortClick = () => {
    const { sortColumn, order } = sorted;
    const unknowList = planetsList.filter((row) => row[sortColumn] === 'unknown');
    const knowList = planetsList.filter((row) => row[sortColumn] !== 'unknown');
    if (order === 'ASC') {
      const sortedArray = knowList.sort(
        (a, b) => a[sortColumn] - b[sortColumn],
      );
      setPlanetsList([...sortedArray, ...unknowList]);
    }
    if (order === 'DESC') {
      const sortedArray = knowList.sort(
        (a, b) => b[sortColumn] - a[sortColumn],
      );
      setPlanetsList([...sortedArray, ...unknowList]);
    }
  };

  const planets = useMemo(
    () => ({
      planetsList,
      APIData,
      filterByName,
      filtersByNumber,
      activeFilters,
      columnOptions,
      // sortOptions,
      sorted,
      handleSort,
      handleChange,
      handleFilter,
      clickFilter,
      removeFilter,
      clearFilter,
      sortClick,
    }),
    [
      planetsList,
      filterByName,
      filtersByNumber,
      APIData,
      activeFilters,
      columnOptions,
      sorted,
      // sortOptions,
    ],
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
