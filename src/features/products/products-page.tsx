import { TriangleAlertIcon } from "lucide-react";
import { Wrapper } from "@/components/ui/wrapper";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Pagination, PaginationCounter } from "@/components/ui/pagination";
import { useProductsQuery } from "@/features/products/use-products-query";
import {
    ProductItemPreview,
    ProductItemPreviewSkeleton,
} from "@/features/products/product-item-preview";
import { MAX_PRODUCTS_PER_PAGE } from "@/constants";

const LIST_CLASS_NAME =
    "grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8";

export function ProductsPage() {
    const { data, error, isPending } = useProductsQuery();

    let content: React.ReactNode = null;

    if (isPending) {
        content = (
            <div className="space-y-6">
                <Skeleton className="mt-2 h-5 w-36" />
                <ul className={LIST_CLASS_NAME}>
                    {Array.from({ length: MAX_PRODUCTS_PER_PAGE }).map(
                        (_, index) => (
                            <li key={index}>
                                <ProductItemPreviewSkeleton />
                            </li>
                        ),
                    )}
                </ul>
            </div>
        );
    }

    if (error) {
        content = (
            <div className="flex flex-col items-center gap-2 py-20 text-rose-500">
                <TriangleAlertIcon />
                <p>An error occurred while fetching products</p>
            </div>
        );
    }

    if (data) {
        content = (
            <div className="space-y-6">
                <h2 className="mt-1">{data.total} Products Found</h2>

                {data.products.length === 0 && (
                    <div className="flex flex-col items-center gap-2 py-20 text-zinc-50">
                        <TriangleAlertIcon />
                        <p>No products found</p>
                    </div>
                )}

                {data.products.length > 0 && (
                    <ul className={LIST_CLASS_NAME}>
                        {data.products.map(product => (
                            <li key={product.id}>
                                <ProductItemPreview
                                    productUrl={`/products/${product.id}`}
                                    title={product.title}
                                    discountPercent={product.discountPercentage}
                                    rating={product.rating}
                                    price={product.price}
                                    imageUrl={product.thumbnail}
                                />
                            </li>
                        ))}
                    </ul>
                )}

                <Separator className="mt-10" />

                <div className="flex flex-wrap items-center justify-end gap-4">
                    <PaginationCounter length={data.total} limit={data.limit} />
                    <Pagination length={data.total} limit={data.limit} />
                </div>
            </div>
        );
    }

    return (
        <Wrapper>
            <h1 className="text-2xl font-bold">Products</h1>
            {content}
        </Wrapper>
    );
}
