import Manufacturer from "../../../../../models/Manufacturer";
import Model from "../../../../../models/Model";
import Product from "../../../../../models/Product";

export interface OrderProps {
    key: number;
    product: Product;
    model: Model | undefined;
    manufacturer: Manufacturer | undefined;
}