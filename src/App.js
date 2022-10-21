import React from 'react';
import './App.css';
import FilterInput from './components/FilterInput';
import Filters from './components/Filters';
import Header from './components/Header';
import Table from './components/Table';
import { StarWarsProvider } from './context/StarWarsProvider';

function App() {
  return (
    <div>
      <StarWarsProvider>
        <Header />
        <FilterInput />
        <Filters />
        <Table />
      </StarWarsProvider>
    </div>
  );
}

export default App;
