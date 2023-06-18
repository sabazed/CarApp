import React from "react";
import { getAllCategories, getAllManufacturers, getAllProducts, getCategories, getManufacturers, getModels, getNextProducts, getProducts } from "../api/CentralController";
import { Period } from "../models/Period";
import { RentType } from "../models/RentType";
import { CategoryType } from "../models/CategoryType";
import { CentralContextProps, ContextProps, StorageContextProps } from "./ContextProps";
import { BargainType } from "../models/BargainType";

const CentralContext = React.createContext<CentralContextProps>({
    getCategories: (type: CategoryType) => { return [] },
    getAllCategories: () => { return [] },
    getManufacturers: (type: CategoryType) => { return [] },
    getAllManufacturers: () => { return [] },
    getModels: (manufacturerIds: number[], storage: StorageContextProps) => { return new Promise(() => { }); },
    getProducts: (storage: StorageContextProps, nextCall: boolean, manufacturers?: number[], models?: number[], categories?: number[],
        priceFrom?: number, priceTo?: number, currency?: number, period?: string,
        bargain?: BargainType, rentTypes?: RentType[], sort?: number, page?: number) => { return new Promise(() => { }); },
    getAllProducts: (storage: StorageContextProps) => { },
    getNextProducts: (storage: StorageContextProps) => { }
});

export const CentralContextProvider: React.FC<ContextProps> = (props) => {

    const context: CentralContextProps = {
        getCategories: getCategories,
        getAllCategories: getAllCategories,
        getManufacturers: getManufacturers,
        getAllManufacturers: getAllManufacturers,
        getModels: getModels,
        getProducts: getProducts,
        getAllProducts: getAllProducts,
        getNextProducts: getNextProducts
    };

    return <CentralContext.Provider value={context}>{props.children}</CentralContext.Provider>;
};

export default CentralContext;
