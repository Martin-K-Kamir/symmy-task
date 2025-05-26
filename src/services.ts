import type { APIResponse } from "@/types";

export type APIProduct = {
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
    returnPolicy: string;
    images: string[];
    availabilityStatus: "In Stock" | "Low Stock" | "Out of Stock";
    shippingInformation: string;
    warrantyInformation: string;
    weight: number;
    dimensions: {
        width: number;
        height: number;
        depth: number;
    };
    reviews: {
        rating: number;
        comment: string;
        date: string;
        reviewerName: string;
        reviewerEmail: string;
    }[];
};

export interface APIProductResponse {
    products: APIProduct[];
    total: number;
    skip: number;
    limit: number;
}

export async function getProducts(page: number = 1, limit: number = 8) {
    const skip = (page - 1) * limit;
    const res = await fetch(
        `https://dummyjson.com/products/category/smartphones?skip=${skip}&limit=${limit}`,
    );

    if (!res.ok) {
        throw new Error(`Failed to fetch products: ${res.status}`);
    }

    const data = (await res.json()) as APIResponse<APIProductResponse>;

    if ("message" in data) {
        throw new Error(data.message);
    }

    return data;
}

export async function getProductById(id: string | number) {
    const res = await fetch(`https://dummyjson.com/products/${id}`);

    if (!res.ok) {
        throw new Error(`Failed to fetch product with ID ${id}: ${res.status}`);
    }

    const data = (await res.json()) as APIResponse<APIProduct>;

    if ("message" in data) {
        throw new Error(data.message);
    }

    return data;
}
