import React, { useContext, useEffect }from 'react';
import StorageContext from './stores/StorageContext';
import CentralContext from './stores/CentralContext';

import Header from './view/components/header/Header';
import logo from './view/resources/imgs/arrw-sml.svg';
import FilterMenu from './view/components/feed/filter-menu/FilterMenu';
import MainView from './view/components/feed/main-view/MainView';
import './App.css';

import { ReactComponent as LoadIcon } from './view/resources/imgs/pulse-rings-3.svg';

function App() {

   const storage = useContext(StorageContext);
   const central = useContext(CentralContext);

   useEffect(() => {
      // central.getProducts(storage, [24, 489], [549, 1491], [1, 2], 10000, 12000, 3, undefined, BargainType.Sale, undefined, 1, 1);
      central.getAllProducts(storage);
   }, []);

   useEffect(() => {
      console.log(storage)
   }, [storage])

  return (
    <div className="App">
      {!storage.loadGlobal && <div className='load-global'><LoadIcon className='load-icon'/></div>}
      <Header />
		<div className='main-body'>
			<div className='main-body-path'>მთავარი <img src={logo} className="header-logo" alt="logo" /></div>
			<div className='main-body-view'>
				<div><FilterMenu /></div>
				<div><MainView /></div>
			</div>
		</div>
    </div>
  );
}

export default App;
