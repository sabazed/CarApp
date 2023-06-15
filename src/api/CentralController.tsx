import React, { useEffect } from 'react';

import Category from "../models/Category";
import Manufacturer from "../models/Manufacturer";
import Model from "../models/Model";
import { Period } from "../models/Period";
import Product from "../models/Product";
import { RentType } from "../models/RentType";
import { CategoryType } from "../models/CategoryType";
import StorageContext from '../stores/StorageContext';
import { nominalTypeHack } from 'prop-types';
import { StorageContextProps } from '../stores/ContextProps';

interface AbstractDictionary<V> {
    [key: number]: V;
} 

const URLS = {
    MANUFACTURERS: "https://static.my.ge/myauto/js/mans.json",
    MODELS: "https://api2.myauto.ge/ka/getManModels?man_id=",
    CATEGORIES: "https://api2.myauto.ge/ka/cats/get",
    PRODUCTS: "https://api2.myauto.ge/ka/products/"
}

const CategoryDescr : AbstractDictionary<Category> = {}; 
const ModelDescr : AbstractDictionary<Model> = {}; 
const ManufacturerDescr : AbstractDictionary<Manufacturer> = {}; 
const ManModelMap : AbstractDictionary<Model[]> = {}; 
const TypeManMap : AbstractDictionary<Manufacturer[]> = {};
const TypeCatMap : AbstractDictionary<Category[]> = {}; 

const fetchCategories = async () => {
    const response = await fetch(URLS.CATEGORIES);
    const data = await response.json();
    data.data.forEach((cat: Category) => {
        if (!(CategoryDescr[cat.category_id])) {
            // Add to categories general list
            CategoryDescr[cat.category_id] = cat;
        }
        // Add to Type -> Cat map
        if (!(TypeCatMap[cat.category_type])) {
            TypeCatMap[cat.category_type] = [];
        }
        TypeCatMap[cat.category_type].push(cat);
    });
}

const fetchManufacturers = async () => {
    const response = await fetch(URLS.MANUFACTURERS);
    const data = await response.json();
    data.data.forEach((man: Manufacturer) => {
        const id : number = Number(man.man_id);
        if (!(ManufacturerDescr[id])) {
            // Add to manufacturers general list
            ManufacturerDescr[id] = man;
        }
        // Add to Type -> Man map
        const type = getManCategory(man).valueOf();
        if (!(TypeManMap[type])) {
            TypeManMap[type] = [];
        }
        TypeManMap[type].push(man);
        // Initialize in Cat -> Man map
        if (!(ManModelMap[id])) {
            ManModelMap[id] = [];
        }
    });
}

const fetchModels = async (manId: number) : Promise<Model[]> => {
    const response = await fetch(URLS.MODELS + manId);
    const data = await response.json();
    data.data.forEach((model: Model) => {
        if (!(ModelDescr[model.model_id])) {
            // Add to manufacturers general list
            ModelDescr[model.model_id] = model;
        }
        // Add to Man -> Model map
        if (!(ManModelMap[model.man_id])) {
            ManModelMap[model.man_id] = [];
        }
        ManModelMap[model.man_id].push(model);
    });
    return data.data;
}

const fetchProducts = async (manufacturers?: number[], models?: number[], category?: number[],
                             priceFrom?: number, priceTo?: number, period?: Period,
                             bargain?: boolean, rentTypes?: RentType[], sort?: number) : Promise<Product[]> => {
    let filter : string = "";
    if (manufacturers) {
        let mans : string = "?Mans="
        if (models) {
            for (const modelId of models) {
                const model = ModelDescr[modelId];
                if (model) {
                    // TODO continue
                }
            }
        }
    }
}

const getManCategory = (man : Manufacturer) : CategoryType => {
    return man.is_car == "1" ? CategoryType.Car : man.is_spec == "1" ? CategoryType.Special : CategoryType.Motorbike;
}

export const getCategories = (type: CategoryType) : Category[] => { 
   return getAllCategories().filter((cat: Category) => cat.category_type == type); 
};

export const getAllCategories = () : Category[] => { 
    return Object.values(CategoryDescr); 
};

export const getManufacturers = (type: CategoryType) : Manufacturer[] => {
     return getAllManufacturers().filter((man : Manufacturer) => getManCategory(man) == type); 
};

export const getAllManufacturers = (): Manufacturer[] => {
    return Object.values(ManufacturerDescr); 
};

export const getModels = (manufacturerIds: number[], storage: StorageContextProps) : Model[] => {
    let models : Model[] = [];
    for (const id of manufacturerIds) {
        fetchModels(id).then(newModels => models = [...models, ...newModels]);
    }
    storage.setModels(models);
    return models;
};
export const getProducts = (storage: StorageContextProps, manufacturers?: number[], models?: number[], category?: number[],
              priceFrom?: number, priceTo?: number, period?: Period,
              bargain?: boolean, rentTypes?: RentType[], sort?: number) : Product[] => {return []; };
export const getAllProducts = () : Product[] => {

};

const CentralController = () => {
    // Initialize
    useEffect(() => {
        fetchCategories();
        fetchManufacturers();
    }, [])
}

export default CentralController;