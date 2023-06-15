import React from "react";
import { getAllCategories, getAllManufacturers, getAllProducts, getCategories, getManufacturers, getModels, getProducts } from "../api/CentralController";
import Category from "../models/Category";
import Manufacturer from "../models/Manufacturer";
import Model from "../models/Model";
import { Period } from "../models/Period";
import Product from "../models/Product";
import { RentType } from "../models/RentType";
import { CategoryType } from "../models/CategoryType";

interface ContextProps {
    children: React.ReactNode
}

interface CentralContextProps {
    getCategories: (type: CategoryType) => Category[];
    getAllCategories: () => Category[];
    getManufacturers: (type: CategoryType) => Manufacturer[];
    getAllManufacturers: () => Manufacturer[];
    getModels: (manufacturerIds: number[]) => Model[];
    getProducts: (manufacturers?: number[], models?: number[], category?: number[],
                  priceFrom?: number, priceTo?: number, period?: Period,
                  bargain?: boolean, rentTypes?: RentType[], sort?: number) => Product[];
    getAllProducts: () => Product[];  
}

const CentralContext = React.createContext<CentralContextProps>({
    getCategories: (type: CategoryType) => { return [] },
    getAllCategories: () => { return [] },
    getManufacturers: (type: CategoryType) => { return [] },
    getAllManufacturers: () => { return [] },
    getModels: (manufacturerIds: number[]) => { return [] },
    getProducts: (manufacturers?: number[], models?: number[], category?: number[],
                  priceFrom?: number, priceTo?: number, period?: Period,
                  bargain?: boolean, rentTypes?: RentType[], sort?: number) => { return [] },
    getAllProducts: () => { return [] }
});

export const CentralContextProvider: React.FC<ContextProps> = (props) => {

    const context: CentralContextProps = {
        getCategories: getCategories,
        getAllCategories: getAllCategories,
        getManufacturers: getManufacturers,
        getAllManufacturers: getAllManufacturers,
        getModels: getModels,
        getProducts: getProducts,
        getAllProducts: getAllProducts
    };

    return <CentralContext.Provider value={context}>{props.children}</CentralContext.Provider>;
};

export default CentralContext;
