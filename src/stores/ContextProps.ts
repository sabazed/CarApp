import Category from "../models/Category";
import { CategoryType } from "../models/CategoryType";
import Manufacturer from "../models/Manufacturer";
import Model from "../models/Model";
import { Period } from "../models/Period";
import Product from "../models/Product";
import { RentType } from "../models/RentType";
import StorageContext from "./StorageContext";

export interface ContextProps {
    children: React.ReactNode
}

export interface CentralContextProps {
    getCategories: (type: CategoryType) => Category[];
    getAllCategories: () => Category[];
    getManufacturers: (type: CategoryType) => Manufacturer[];
    getAllManufacturers: () => Manufacturer[];
    getModels: (manufacturerIds: number[], storage: StorageContextProps) => Model[];
    getProducts: (storage: StorageContextProps, manufacturers?: number[], models?: number[], category?: number[],
                  priceFrom?: number, priceTo?: number, period?: Period,
                  bargain?: boolean, rentTypes?: RentType[], sort?: number) => Product[];
    getAllProducts: () => Product[];  
}

export interface StorageContextProps {
    models: Model[];
    products: Product[]; 
    currency: number;
    setModels: (models: Model[]) => void;
    setProducts: (products: Product[]) => void;
    setCurrency: (currency: number) => void;
}