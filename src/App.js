import React from 'react';
import './App.css';
import Filter from './components/Filter';
import Header from './components/Header';
import Table from './components/Table';
import { StarWarsProvider } from './context/StarWarsProvider';

function App() {
  return (
    <div>
      <StarWarsProvider>
        <Header />
        <Filter />
        <Table />
      </StarWarsProvider>
    </div>
  );
}

export default App;
