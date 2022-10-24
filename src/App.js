import React from 'react';
import './App.css';
import FilterInput from './components/FilterInput';
import Filters from './components/Filters';
import Header from './components/Header';
import SortTable from './components/SortTable';
import Table from './components/Table';
import { StarWarsProvider } from './context/StarWarsProvider';

function App() {
  return (
    <section>
      <StarWarsProvider>
        <Header />
        <FilterInput />
        <SortTable />
        <Filters />
        <Table />
      </StarWarsProvider>
    </section>
  );
}

export default App;
