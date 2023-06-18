import React, { useState } from "react";
import Model from "../models/Model";
import Product from "../models/Product";
import { StorageContextProps, ContextProps } from "./ContextProps";

const StorageContext = React.createContext<StorageContextProps>({
    models: [],
    products: [], 
    currency: -1,
    totalVehicles: -1,
    currPage: -1,
    lastPage: -1,
    period: "",
    sort: -1,
    loadGlobal: false,
    loadLocal: false,
    setModels: (models: Model[]) => {},
    setProducts: (products: Product[]) => {},
    setCurrency: (currency: number) => {},
    setTotalVehicles: (totalVehicles: number) => {},
    setCurrPage: (currPage: number) => {},
    setLastPage: (lastPage: number) => {},
    setPeriod: (period: string) => {},
    setSort: (sort: number) => {},
    setLoadGlobal: (loadGlobal: boolean) => {},
    setLoadLocal: (loadLocal: boolean) => {},
});

export const StorageContextProvider: React.FC<ContextProps> = (props) => {

    const [models, setModels] = useState<Model[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [currency, setCurrency] = useState<number>(-1);
    const [totalVehicles, setTotalVehicles] = useState<number>(-1);
    const [currPage, setCurrPage] = useState<number>(-1);
    const [lastPage, setLastPage] = useState<number>(-1);
    const [period, setPeriod] = useState<string>('');
    const [sort, setSort] = useState<number>(-1);
    const [loadGlobal, setLoadGlobal] = useState<boolean>(false);
    const [loadLocal, setLoadLocal] = useState<boolean>(false);

    const context: StorageContextProps = {
        models: models,
        products: products, 
        currency: currency,
        totalVehicles: totalVehicles,
        currPage: currPage,
        lastPage: lastPage,
        period: period,
        sort: sort,
        loadGlobal: loadGlobal,
        loadLocal: loadLocal,
        setModels: setModels,
        setProducts: setProducts,
        setCurrency: setCurrency,
        setTotalVehicles: setTotalVehicles,
        setCurrPage: setCurrPage,
        setLastPage: setLastPage,
        setPeriod: setPeriod,
        setSort: setSort,
        setLoadGlobal: setLoadGlobal,
        setLoadLocal: setLoadLocal,
    };

    return <StorageContext.Provider value={context}>{props.children}</StorageContext.Provider>;
};

export default StorageContext;
