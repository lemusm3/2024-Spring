import { api } from "@/viewModel/session"
import type { ObjectId } from "mongodb";

export interface Product {
    _id: ObjectId; // MongoDB ID
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
}

export function getProducts() {
    return api<Product[]>("products");
}