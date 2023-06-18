import { BargainType } from "../models/BargainType";
import Category from "../models/Category";
import { CategoryType } from "../models/CategoryType";
import Manufacturer from "../models/Manufacturer";
import Model from "../models/Model";
import { Period } from "../models/Period";
import Product from "../models/Product";
import { RentType } from "../models/RentType";

export interface ContextProps {
    children: React.ReactNode
}

export interface CentralContextProps {
    getCategories: (type: CategoryType) => Category[];
    getAllCategories: () => Category[];
    getManufacturers: (type: CategoryType) => Manufacturer[];
    getAllManufacturers: () => Manufacturer[];
    getModels: (manufacturerIds: number[], storage: StorageContextProps) => Promise<void>;
    getProducts: (storage: StorageContextProps, manufacturers?: number[], models?: number[], categories?: number[],
                  priceFrom?: number, priceTo?: number, currency?: number, period?: string,
                  bargain?: BargainType, rentTypes?: RentType[], sort?: number, page?: number) => Promise<void>;
    getAllProducts: (storage: StorageContextProps) => void;  
}

export interface StorageContextProps {
    models: Model[];
    products: Product[]; 
    currency: number;
    totalVehicles: number;
    lastPage: number;
    setModels: (models: Model[]) => void;
    setProducts: (products: Product[]) => void;
    setCurrency: (currency: number) => void;
    setTotalVehicles: (totalVehicles: number) => void;
    setLastPage: (lastPage: number) => void;
}