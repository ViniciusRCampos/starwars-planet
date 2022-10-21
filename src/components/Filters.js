import React, { useContext } from 'react';
import { planetsContext } from '../context/StarWarsProvider';

export default function Filters() {
  const { activeFilters, removeFilter } = useContext(planetsContext);
  return (
    <ul>
      {activeFilters.map(({ column, value, comparison }, key) => (
        <li data-testid="filter" key={ key }>
          {`${column} ${comparison} ${value} `}
          <button
            type="button"
            name={ key }
            onClick={ removeFilter }
          >
            remove
          </button>

        </li>
      ))}
    </ul>
  );
}
