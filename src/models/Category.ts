import { VehicleType } from "./VehicleType";

export default interface Category {
    category_id: number;
    category_type: number;
    has_icon: number;
    title: string;
    seo_title: string;
    vehicle_types: VehicleType[];
}