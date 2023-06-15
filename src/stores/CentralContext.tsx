import React from "react";
import { getAllCategories, getAllManufacturers, getAllProducts, getCategories, getManufacturers, getModels, getProducts } from "../api/CentralController";
import { Period } from "../models/Period";
import { RentType } from "../models/RentType";
import { CategoryType } from "../models/CategoryType";
import { CentralContextProps, ContextProps, StorageContextProps } from "./ContextProps";

const CentralContext = React.createContext<CentralContextProps>({
    getCategories: (type: CategoryType) => { return [] },
    getAllCategories: () => { return [] },
    getManufacturers: (type: CategoryType) => { return [] },
    getAllManufacturers: () => { return [] },
    getModels: (manufacturerIds: number[], storage: StorageContextProps) => { return [] },
    getProducts: (storage: StorageContextProps, manufacturers?: number[], models?: number[], category?: number[],
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
