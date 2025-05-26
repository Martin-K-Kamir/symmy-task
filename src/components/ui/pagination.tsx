import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router";
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    ChevronsLeftIcon,
    ChevronsRightIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils";

export function PaginationButton({
    variant = "outline",
    size = "icon",
    className,
    ...props
}: React.ComponentProps<typeof Button>) {
    return (
        <Button
            {...props}
            variant={variant}
            size={size}
            className={cn("size-8", className)}
        />
    );
}

export function PaginationCounter({
    className,
    length,
    limit,
    ...props
}: React.ComponentProps<"p"> & {
    length: number;
    limit: number;
}) {
    const [searchParams] = useSearchParams();
    const pageParam = searchParams.get("page");

    const currentPage = (() => {
        const parsed = parseInt(pageParam || "");
        return isNaN(parsed) ? 0 : Math.max(0, parsed - 1);
    })();

    const totalPages = Math.max(Math.ceil(length / limit), 1);

    return (
        <p {...props} className={cn("text-sm text-zinc-300", className)}>
            Page {currentPage + 1} of {totalPages}
        </p>
    );
}

export function Pagination({
    className,
    length,
    limit,
    onPageChange,
    ...props
}: Omit<React.ComponentProps<"nav">, "children"> & {
    length: number;
    limit: number;
    onPageChange?: (index: number) => void;
}) {
    const [searchParams, setSearchParams] = useSearchParams();
    const pageParam = searchParams.get("page");
    const totalPages = Math.ceil(length / limit);

    const currentPage = useMemo(() => {
        const parsed = parseInt(pageParam || "");
        return isNaN(parsed) ? 0 : Math.max(0, parsed - 1);
    }, [pageParam]);

    useEffect(() => {
        onPageChange?.(currentPage);
    }, [currentPage]);

    const isNextDisabled = currentPage >= totalPages - 1;
    const isPrevDisabled = currentPage <= 0;
    const isAtFirst = currentPage === 0;
    const isAtLast = currentPage === totalPages - 1 || totalPages === 0;

    function updatePageParam(index: number) {
        const newParams = new URLSearchParams(searchParams);
        newParams.set("page", (index + 1).toString());
        setSearchParams(newParams);
    }

    function handleNext() {
        if (!isNextDisabled) updatePageParam(currentPage + 1);
    }

    function handlePrev() {
        if (!isPrevDisabled) updatePageParam(currentPage - 1);
    }

    function handleFirst() {
        if (!isAtFirst) updatePageParam(0);
    }

    function handleLast() {
        if (!isAtLast) updatePageParam(totalPages - 1);
    }

    return (
        <nav
            aria-label="Pagination Navigation"
            className={cn(className)}
            {...props}
        >
            <ul className="flex items-center gap-2">
                <li>
                    <PaginationButton
                        onClick={handleFirst}
                        disabled={isAtFirst}
                        tabIndex={isAtFirst ? -1 : undefined}
                    >
                        <span className="sr-only">Go to first page</span>
                        <ChevronsLeftIcon />
                    </PaginationButton>
                </li>
                <li>
                    <PaginationButton
                        onClick={handlePrev}
                        disabled={isPrevDisabled}
                        tabIndex={isPrevDisabled ? -1 : undefined}
                    >
                        <span className="sr-only">Go to previous page</span>
                        <ChevronLeftIcon />
                    </PaginationButton>
                </li>
                <li>
                    <PaginationButton
                        onClick={handleNext}
                        disabled={isNextDisabled}
                        tabIndex={isNextDisabled ? -1 : undefined}
                    >
                        <span className="sr-only">Go to next page</span>
                        <ChevronRightIcon />
                    </PaginationButton>
                </li>
                <li>
                    <PaginationButton
                        onClick={handleLast}
                        disabled={isAtLast}
                        tabIndex={isAtLast ? -1 : undefined}
                    >
                        <span className="sr-only">Go to last page</span>
                        <ChevronsRightIcon />
                    </PaginationButton>
                </li>
            </ul>
        </nav>
    );
}
