import React, { useContext } from 'react';
import { planetsContext } from '../context/StarWarsProvider';

export default function Filter() {
  const { filtersByNumber, handleFilter, clickFilter } = useContext(planetsContext);
  const { column, comparison, value } = filtersByNumber;

  return (
    <form>
      <select
        name="column"
        data-testid="column-filter"
        value={ column }
        onChange={ handleFilter }
      >
        {[
          'population',
          'orbital_period',
          'diameter',
          'rotation_period',
          'surface_water',
        ].map((event) => (
          <option key={ event } value={ event }>
            {event}
          </option>
        ))}
      </select>

      <select
        name="comparison"
        value={ comparison }
        onChange={ handleFilter }
        data-testid="comparison-filter"
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual A">igual a</option>
      </select>

      <input
        name="value"
        type="number"
        data-testid="value-filter"
        value={ value }
        onChange={ handleFilter }
      />

      <button type="button" data-testid="button-filter" onClick={ clickFilter }>
        Adicionar Filtro
      </button>
    </form>
  );
}
