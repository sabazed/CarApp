import React, { useContext, useEffect }from 'react';
import logo from './logo.svg';
import './App.css';
import StorageContext from './stores/StorageContext';
import CentralContext from './stores/CentralContext';
import { BargainType } from './models/BargainType';
import { RentType } from './models/RentType';

function App() {

   const storage = useContext(StorageContext);
   const central = useContext(CentralContext);

   useEffect(() => {
    setTimeout(() => {
      central.getProducts(storage, [24, 489], [549, 1491], [1, 2], 10000, 12000, 3,
        undefined, BargainType.Sale, undefined, 1, 1 );
    }, 2000);
   }, []);

   useEffect(() => {
      console.log(storage.products);
      console.log(storage)
   }, [storage.products])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        
      </header>
    </div>
  );
}

export default App;
