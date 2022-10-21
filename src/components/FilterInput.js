import React, { useContext } from 'react';
import { planetsContext } from '../context/StarWarsProvider';

export default function FilterInput() {
  const { filtersByNumber, handleFilter,
    clickFilter, columnOptions, clearFilter } = useContext(planetsContext);
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

      <button
        data-testid="button-remove-filters"
        type="button"
        onClick={ clearFilter }
      >
        Limpar Filtros

      </button>
    </form>
  );
}
