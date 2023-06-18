import React, { useContext, useEffect } from 'react';

import Category from "../models/Category";
import Manufacturer from "../models/Manufacturer";
import Model from "../models/Model";
import { Period } from "../models/Period";
import Product from "../models/Product";
import { RentType } from "../models/RentType";
import { CategoryType } from "../models/CategoryType";
import { ContextProps, StorageContextProps } from '../stores/ContextProps';
import { BargainType } from '../models/BargainType';
import StorageContext from '../stores/StorageContext';

interface AbstractDictionary<V> {
    [key: number]: V;
}

const URLS = {
    MANUFACTURERS: "https://static.my.ge/myauto/js/mans.json",
    MODELS: "https://api2.myauto.ge/en/getManModels?man_id=",
    CATEGORIES: "https://api2.myauto.ge/ka/cats/get",
    PRODUCTS: "https://api2.myauto.ge/en/products"
}

const CategoryDescr: AbstractDictionary<Category> = {};
const ModelDescr: AbstractDictionary<Model> = {};
const ManufacturerDescr: AbstractDictionary<Manufacturer> = {};
const ManModelMap: AbstractDictionary<Model[]> = {};
const TypeManMap: AbstractDictionary<Manufacturer[]> = {};
const TypeCatMap: AbstractDictionary<Category[]> = {};

interface ProductResponse {
    items: Product[],
    meta: {
        total: number,
        last_page: number
    },
    url: string
}

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
    data.forEach((man: Manufacturer) => {
        const id: number = Number(man.man_id);
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
    if (ManModelMap[manId] && ManModelMap[manId].length > 0) return ManModelMap[manId];
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

const fetchProductsNext = async (url: string, period: string, sort: number, page: number): Promise<ProductResponse>  => {
    if(url.includes('Period=')) {
        const indexStart = url.indexOf('Period=') + 7;
        const indexEnd = url.indexOf('&', indexStart);
        url = url.substring(0, indexStart) + period + url.substring(indexEnd); 
    }
    else {
        url += 'Period=' + period + '&';
    }
    
    if(url.includes('Page=')) {
        const indexStart = url.indexOf('Page=') + 5;
        const indexEnd = url.indexOf('&', indexStart);
        url = url.substring(0, indexStart) + page + url.substring(indexEnd); 
    }
    else {
        url += 'Page=' + page + '&';
    }
    
    if(url.includes('SortOrder=')) {
        const indexStart = url.indexOf('SortOrder=') + 10;
        const indexEnd = url.indexOf('&', indexStart);
        url = url.substring(0, indexStart) + sort + url.substring(indexEnd); 
    }
    else {
        url += 'SortOrder=' + period + '&';
    }

    const response = await fetch(url);
    const data = await response.json();
    return {...data.data, url: url};
}

const fetchProducts = async (manufacturers?: number[], models?: number[], categories?: number[],
    priceFrom?: number, priceTo?: number, currency?: number, period?: string,
    bargain?: BargainType, rentTypes?: RentType[], sort?: number, page?: number): Promise<ProductResponse> => {
    let filter: string = "?";
    let paramStr: string = "";
    if (manufacturers) {
        paramStr = "Mans="
        let paramMap: { [key: number]: number[] } = {};
        for (const manId of manufacturers) {
            paramMap[manId] = [];
            if (!ManModelMap[manId] || ManModelMap[manId].length == 0) {
                await fetchModels(manId);
            }
        }
        if (models) {
            for (const modelId of models) {
                const model = ModelDescr[modelId];
                if (model && paramMap[model.man_id]) {
                    paramMap[model.man_id].push(modelId);
                }
            }
        }
        for (const [key, value] of Object.entries(paramMap)) {
            paramStr += `${key}${value.length > 0 ? ('.' + value.join('.')) : ''}-`;
        }
        filter += paramStr.substring(0, paramStr.length - 1) + "&";
    }

    if (categories) {
        paramStr = `Cats=${categories.join('.')}`
        filter += paramStr + "&";
    }

    if (priceFrom) {
        paramStr = 'PriceFrom=' + priceFrom;
        filter += paramStr + "&";
    }
    if (priceTo) {
        paramStr = 'PriceTo=' + priceTo;
        filter += paramStr + "&";
    }

    if (currency) {
        paramStr = 'CurrencyID=' + currency;
        filter += paramStr + "&";
    }

    if (period) {
        paramStr = `Period=${period}`
        filter += paramStr + "&";
    }

    if (bargain) {
        paramStr = "ForRent=" + (bargain.endsWith("sale") ? 0 : 1);
        filter += paramStr + "&";
    }

    if (rentTypes) {
        paramStr = "";
        for (const type of rentTypes) {
            paramStr += `Rent${Object.keys(RentType)[Object.values(RentType).indexOf(type)]}=1&`
        }
        filter += paramStr;
    }

    if (sort) {
        paramStr = "SortOrder=" + sort;
        filter += paramStr + "&";
    }

    if (page) {
        paramStr = "Page=" + page;
        filter += paramStr + "&";
    }
    else {
        paramStr = "Page=1";
        filter += paramStr + "&";
    }
    const response = await fetch(URLS.PRODUCTS + filter);
    const data = await response.json();
    return {...data.data, url: URLS.PRODUCTS + filter};
}

const getManCategory = (man: Manufacturer): CategoryType => {
    return man.is_car == "1" ? CategoryType.Car : man.is_spec == "1" ? CategoryType.Special : CategoryType.Motorbike;
}

export const getCategories = (type: CategoryType): Category[] => {
    return getAllCategories().filter((cat: Category) => cat.category_type == type);
};

export const getAllCategories = (): Category[] => {
    return Object.values(CategoryDescr);
};

export const getManufacturers = (type: CategoryType): Manufacturer[] => {
    return getAllManufacturers().filter((man: Manufacturer) => getManCategory(man) == type);
};

export const getAllManufacturers = (): Manufacturer[] => {
    return Object.values(ManufacturerDescr);
};

export const getModels = async (manufacturerIds: number[], storage: StorageContextProps): Promise<void> => {
    let models: Model[] = [];
    for (const id of manufacturerIds) {
        await fetchModels(id).then(newModels => {
            models = [...models, ...newModels];
        });
    }
    storage.setModels([...storage.models, ...models]);
};
export const getProducts = async (storage: StorageContextProps, nextCall: boolean, manufacturers?: number[], models?: number[], categories?: number[],
    priceFrom?: number, priceTo?: number, currency?: number, period?: string,
    bargain?: BargainType, rentTypes?: RentType[], sort?: number, page?: number): Promise<void> => {
    let products: Product[] = [];
    let total: number = -1;
    let lastPage: number = -1;
    if (nextCall) {
        await fetchProductsNext(storage.lastProducts, storage.period, storage.sort, storage.currPage)
            .then(newProducts => {
                products = [...newProducts.items];
                total = newProducts.meta.total;
                lastPage = newProducts.meta.last_page;
                storage.setLastProducts(newProducts.url);
                storage.setLoadLocal(newProducts.meta.total == 0);
    });
    }
    else {
        await fetchProducts(manufacturers, models, categories, priceFrom, priceTo, currency, period, bargain, rentTypes, sort, page)
            .then(newProducts => {
                products = [...newProducts.items];
                total = newProducts.meta.total;
                lastPage = newProducts.meta.last_page;
                storage.setLastProducts(newProducts.url);
                storage.setLoadLocal(newProducts.meta.total == 0);
            });
    }
    
    const manIds : number[] = [];
    products.forEach((prod: Product) => {
        if (!manIds.includes(prod.man_id)) {
            manIds.push(prod.man_id);
        }
    });
    getModels(manIds, storage);

    storage.setProducts(products);
    storage.setTotalVehicles(total);
    storage.setLastPage(lastPage);
};

export const getAllProducts = (storage: StorageContextProps): void => {
    getProducts(storage, false);
};
export const getNextProducts = (storage: StorageContextProps): void => {
    storage.setLoadLocal(false);
    getProducts(storage, true);
};

const CentralController = (props: ContextProps) => {
    const storage = useContext(StorageContext);
    // Initialize
    useEffect(() => {
        fetchCategories();
        fetchManufacturers();
        setTimeout(() => {
            storage.setLoadGlobal(true);
        }, 3500);
       
    }, []);
    return <>{props.children}</>;
}

export default CentralController;