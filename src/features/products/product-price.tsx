import { cn, formatCurrency, formatDiscount } from "@/utils";

export function ProductPrice({
    price,
    discountPercent,
    className,
    classNamePrice,
    ...props
}: {
    price: number;
    discountPercent?: number;
    classNamePrice?: string;
} & Omit<React.ComponentProps<"p">, "children">) {
    return (
        <p {...props} className={cn("text-sm text-gray-200", className)}>
            {discountPercent ? (
                <>
                    <span
                        className={cn(
                            "line-through opacity-65",
                            classNamePrice,
                        )}
                    >
                        {formatCurrency(price)}
                    </span>{" "}
                    {formatDiscount(price, discountPercent)}
                </>
            ) : (
                formatCurrency(price)
            )}
        </p>
    );
}
