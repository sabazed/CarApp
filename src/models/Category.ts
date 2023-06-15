import { CategoryType } from "./CategoryType";

export default interface Category {
    category_id: number;
    category_type: CategoryType;
    has_icon: number;
    title: string;
    seo_title: string;
    vehicle_types: CategoryType[];
}