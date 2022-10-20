import React, { useContext } from 'react';
import { planetsContext } from '../context/StarWarsProvider';

export default function Filter() {
  const { filtersByNumber, handleFilter,
    clickFilter, columnOptions } = useContext(planetsContext);
  const { column, comparison, value } = filtersByNumber;

  return (
    <form>
      <select
        name="column"
        data-testid="column-filter"
        value={ column }
        onChange={ handleFilter }
      >
        {columnOptions.map((event) => (
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
        <option value="igual a">igual a</option>
      </select>

      <input
        name="value"
        type="number"
        min="0"
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
