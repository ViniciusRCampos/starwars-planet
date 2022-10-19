import React from 'react';
import './App.css';
import Table from './components/Table';
import { StarWarsProvider } from './context/StarWarsProvider';

function App() {
  return (
    <div>
      <StarWarsProvider>
        <Table />
      </StarWarsProvider>
    </div>
  );
}

export default App;
