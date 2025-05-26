import { useSearchParams } from "react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getProducts } from "@/services";
import { MAX_PRODUCTS_PER_PAGE } from "@/constants";

export function useProductsQuery() {
    const queryClient = useQueryClient();
    const [searchParams, setSearchParams] = useSearchParams();

    const page = !searchParams.get("page")
        ? 1
        : Number(searchParams.get("page"));

    const queryData = useQuery({
        queryKey: ["products", page],
        queryFn: () => getProducts(page, MAX_PRODUCTS_PER_PAGE),
    });

    const totalPages = Math.ceil(
        (queryData.data?.total ?? 0) / MAX_PRODUCTS_PER_PAGE,
    );

    if (queryData.data && totalPages < page) {
        const newParams = new URLSearchParams(searchParams);
        newParams.set("page", "1");
        setSearchParams(newParams, { replace: true });
    }

    if (page < totalPages) {
        queryClient.prefetchQuery({
            queryKey: ["products", page + 1],
            queryFn: () => getProducts(page + 1, MAX_PRODUCTS_PER_PAGE),
        });
    }

    if (page > 1) {
        queryClient.prefetchQuery({
            queryKey: ["products", page - 1],
            queryFn: () => getProducts(page - 1, MAX_PRODUCTS_PER_PAGE),
        });
    }

    return queryData;
}
