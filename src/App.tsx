import React, { useContext, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import StorageContext from './stores/StorageContext';
import CentralContext from './stores/CentralContext';
import { BargainType } from './models/BargainType';
import { RentType } from './models/RentType';
import "bootstrap/dist/css/bootstrap.min.css";
import Filter from './filter/Filter';
import Sort from './filter/sort/Sort';
import PageLayout from './view/PageLayout';

function App() {

  const storage = useContext(StorageContext);
  const central = useContext(CentralContext);

  return (
    <div className="App">
      <Filter />
      <PageLayout />
      {/* <Sort /> */}
    </div>
  );
}

export default App;
