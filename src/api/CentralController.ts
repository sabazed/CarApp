import Category from "../models/Category";
import Manufacturer from "../models/Manufacturer";
import Model from "../models/Model";
import { Period } from "../models/Period";
import Product from "../models/Product";
import { RentType } from "../models/RentType";
import { VehicleType } from "../models/VehicleType";

export const getCategories = (type: VehicleType) : Category[] => { return []; };
export const getAllCategories = () : Category[] => { return []; };
export const getManufacturers = (type: VehicleType) : Manufacturer[] => { return []; };
export const getAllManufacturers = (): Manufacturer[] => { return []; };
export const getModels = (manufacturerId: number) : Model[] => { return []; };
export const getProducts = (manufacturers?: number[], models?: number[], category?: number[],
              priceFrom?: number, priceTo?: number, period?: Period,
              bargain?: boolean, rentTypes?: RentType[], sort?: number) : Product[] => { return []; };
export const getAllProducts = () : Product[] => { return []; };