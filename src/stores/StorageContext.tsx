import React, { useState } from "react";
import Model from "../models/Model";
import Product from "../models/Product";
import { StorageContextProps, ContextProps } from "./ContextProps";

const StorageContext = React.createContext<StorageContextProps>({
    models: [],
    products: [], 
    currency: -1,
    setModels: (models: Model[]) => {},
    setProducts: (products: Product[]) => {},
    setCurrency: (currency: number) => {}
});

export const StorageContextProvider: React.FC<ContextProps> = (props) => {

    const [models, setModels] = useState<Model[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [currency, setCurrency] = useState<number>(-1);

    const context: StorageContextProps = {
        models: models,
        products: products, 
        currency: currency,
        setModels: setModels,
        setProducts: setProducts,
        setCurrency: setCurrency
    };

    return <StorageContext.Provider value={context}>{props.children}</StorageContext.Provider>;
};

export default StorageContext;
