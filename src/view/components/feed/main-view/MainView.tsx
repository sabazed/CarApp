import { useContext, useEffect, useState } from 'react';
import { CentralContextProps, StorageContextProps } from '../../../../stores/ContextProps';
import StorageContext from '../../../../stores/StorageContext';
import CentralContext from '../../../../stores/CentralContext';
import Product from '../../../../models/Product';
import Order from './order/Order';
import Model from '../../../../models/Model';

import { ReactComponent as LoadIcon } from '../../../../view/resources/imgs/pulse-rings-3.svg';
import './MainView.css';
import Sort from '../../../../filter/sort/Sort';
import PageLayout from '../../../PageLayout';

const getModel = (product: Product, storage: StorageContextProps) => {
    return storage.models.find((model: Model) => model.model_id == product.model_id && model.man_id == product.man_id);
}

const getManufacturer = (product: Product, central: CentralContextProps) => {
    return central.getAllManufacturers().find((man => man.man_id == product.man_id.toString()));
}

const MainView = () => {

    const central = useContext(CentralContext);
    const storage = useContext(StorageContext);
    const [currPage, setCurrPage] = useState<Product[]>([]);

    useEffect(() => setCurrPage(storage.products), [storage.products]);
    useEffect(() => { 
        if (currPage.length == 0) {
            storage.setLoadLocal(false)
        }
        else {
            setTimeout(() => storage.setLoadLocal(currPage.length != 0), 6000) 
        }
    }, [currPage]);

    return (
        <div className="main-view">
            <div className='main-view-header'>
                <div className='main-view-total'>{storage.totalVehicles} განცხადება</div>
                <div className='main-view-filters'>
                    <Sort handleSubmit={() => {storage.setProducts([]); central.getNextProducts(storage)}} />
                </div>
            </div>
            {storage.loadLocal && <div className='main-view-body'>
                {currPage.map((product: Product) => 
                    <Order key={product.car_id} product={product} model={getModel(product, storage)} manufacturer={getManufacturer(product, central)}/>)
                }
            </div>}
            {!storage.loadLocal && <div className='load-local'><LoadIcon className='load-icon'/></div>}
            <div className='main-view-footer'><PageLayout handleSubmit={() => {storage.setProducts([]); central.getNextProducts(storage)}} /></div>
        </div>
    );
}

export default MainView;