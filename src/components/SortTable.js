import React, { useContext } from 'react';
import { planetsContext } from '../context/StarWarsProvider';

export default function SortTable() {
  const { sorted, handleSort, sortClick } = useContext(planetsContext);
  const { sortColumn } = sorted;
  const OPTIONS = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  return (

    <form>
      <label htmlFor="column-sort">
        <select
          data-testid="column-sort"
          value={ sortColumn }
          name="sortColumn"
          id="column-sort"
          onChange={ handleSort }
        >
          {OPTIONS.map((event) => (
            <option key={ event } value={ event }>
              {event}
            </option>
          ))}
        </select>
      </label>
      <label htmlFor="column-sort-input-asc">
        <input
          type="radio"
          data-testid="column-sort-input-asc"
          value="ASC"
          id="column-sort-input-asc"
          name="order"
          onChange={ handleSort }
        />
        ASC
      </label>
      <label htmlFor="column-sort-input-desc">
        <input
          type="radio"
          data-testid="column-sort-input-desc"
          value="DESC"
          id="column-sort-input-desc"
          name="order"
          onChange={ handleSort }
        />
        DESC
      </label>
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ sortClick }
      >
        Sort
      </button>
    </form>
  );
}
