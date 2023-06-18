import Select from 'react-select';
import { useContext, useEffect, useState } from 'react';
import { CentralContextProps, StorageContextProps } from '../../../../stores/ContextProps';
import StorageContext from '../../../../stores/StorageContext';
import CentralContext from '../../../../stores/CentralContext';
import { SortType } from '../../../../models/SortType';
import Product from '../../../../models/Product';
import Order from './order/Order';
import Model from '../../../../models/Model';

import { ReactComponent as LoadIcon } from '../../../../view/resources/imgs/pulse-rings-3.svg';
import './MainView.css';


interface SelectOption<V, L> {
    label: L;
    value: V;
};

const getModel = (product: Product, storage: StorageContextProps) => {
    return storage.models.find((model: Model) => model.model_id == product.model_id && model.man_id == product.man_id);
}

const getManufacturer = (product: Product, central: CentralContextProps) => {
    return central.getAllManufacturers().find((man => man.man_id == product.man_id.toString()));
}

const MainView = () => {

    const [sort, setSort] = useState<number>(-1);
    const [period, setPeriod] = useState<string>('');

    const sortArr : SelectOption<number, string>[] = Object.values(SortType).map(v => { return { value: v.value, label: v.label } });
    const periodArr : SelectOption<string, string>[] = [
        { value: '1h', label: "1 hour" },
        { value: '3h', label: "3 hours" },
        { value: '6h', label: "6 hours" },
        { value: '12h', label: "12 hours" },
        { value: '24h', label: "24 hours" }
    ];
    const sortHandler = (opt: SelectOption<number, string> | null) => opt && setSort(opt.value);
    const periodHandler = (opt: SelectOption<string, string> | null) => opt && setPeriod(opt.value);
    const colorStyles = { control: (styles: any) => ({ ...styles, backgroundColor: 'none' }) };

    const central = useContext(CentralContext);
    const storage = useContext(StorageContext);
    const [currPage, setCurrPage] = useState<Product[]>([]);

    useEffect(() => setCurrPage(storage.products), [storage.products]);
    useEffect(() => storage.setLoadLocal(currPage.length == 15), [currPage]);

    return (
        <div className="main-view">
            <div className='main-view-header'>
                <div className='main-view-total'>{storage.totalVehicles} განცხადება</div>
                <div className='main-view-filters'>
                    <div><Select className="main-view-filter" styles={colorStyles} components={{IndicatorSeparator: () => null}} options={periodArr} placeholder="პერიოდი" onChange={periodHandler} /></div>
                    <div><Select className="main-view-filter" styles={colorStyles} components={{IndicatorSeparator: () => null}} options={sortArr} placeholder="სორტირება" onChange={sortHandler} /></div>
                </div>
            </div>
            {storage.loadLocal && <div className='main-view-body'>
                {currPage.map((product: Product) => 
                    <Order key={product.car_id} product={product} model={getModel(product, storage)} manufacturer={getManufacturer(product, central)}/>)
                }
            </div>}
            {!storage.loadLocal && <div className='load-local'><LoadIcon className='load-icon'/></div>}
            <div>pages</div>
        </div>
    );
}

export default MainView;