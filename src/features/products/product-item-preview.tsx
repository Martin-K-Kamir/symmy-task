import { StarIcon } from "lucide-react";
import { Link } from "react-router";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductPrice } from "@/features/products/product-price";
import { cn } from "@/utils";

type BaseProps = {
    title: string;
    price: number;
    imageUrl: string;
    rating?: number;
    discountPercent?: number;
};

type AsLink = BaseProps & {
    productUrl: string;
} & Omit<React.ComponentProps<typeof Link>, "to" | "children">;

type AsDiv = BaseProps & {
    productUrl?: undefined;
} & Omit<React.ComponentProps<"div">, "children">;

export type ProductItemPreviewProps = AsLink | AsDiv;

export function ProductItemPreview({
    title,
    price,
    imageUrl,
    rating,
    discountPercent,
    className,
    productUrl,
    ...props
}: ProductItemPreviewProps) {
    const isLink = !!productUrl;
    const Comp = (isLink ? Link : "div") as React.ElementType;

    const compProps = isLink
        ? { ...(props as AsLink), to: productUrl }
        : { ...(props as AsDiv) };

    return (
        <Comp
            {...compProps}
            className={cn(
                "group/product-item-preview relative space-y-2.5 transition-colors outline-none",
                className,
            )}
        >
            <div
                className={cn(
                    "grid aspect-square place-items-center rounded-xl bg-zinc-800 p-6 transition-colors",
                    isLink && "group-hover/product-item-preview:bg-zinc-700",
                )}
            >
                <img src={imageUrl} alt={`Image of ${title}`} loading="lazy" />
            </div>
            <div className="space-y-0.5">
                <h3 className="text-lg font-semibold">{title}</h3>
                <ProductPrice price={price} discountPercent={discountPercent} />
                {rating && (
                    <div className="flex items-center text-sm">
                        <StarIcon className="size-3 translate-y-px fill-amber-400 text-amber-400" />{" "}
                        <span className="ml-1.5">{rating.toFixed(1)}</span>
                    </div>
                )}
                {isLink && (
                    <span className="pointer-events-none absolute -inset-2.5 rounded-lg ring-zinc-200 group-focus-visible/product-item-preview:ring-2" />
                )}
            </div>
        </Comp>
    );
}

export function ProductItemPreviewSkeleton({
    className,
}: {
    className?: string;
}) {
    return (
        <div className={cn("space-y-4", className)}>
            <Skeleton className="aspect-square rounded-xl" />
            <div className="mb-1 space-y-1.5">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-1/3" />
            </div>
        </div>
    );
}
