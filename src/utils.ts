import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatCurrency(
    value: number,
    currency: string = "USD",
    locale: string = "en-US",
): string {
    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
}

export function formatDiscount(price: number, discountPercent: number): string {
    const discountedPrice = price - (price * discountPercent) / 100;
    return `${formatCurrency(discountedPrice)} (${discountPercent.toFixed(0)}% off)`;
}

export function assertProductIdExists(
    productId: string | undefined,
): asserts productId is string {
    if (!productId) {
        throw new Error("Product ID is required");
    }
}
