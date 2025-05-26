import { cn } from "@/utils";
import { StarIcon } from "lucide-react";

export type StarsProps = {
    length: number;
    maxLength?: number;
    classNameIcon?: string;
    render?: (index: number) => React.ReactNode;
} & Omit<React.ComponentProps<"div">, "children">;

export function Stars({
    length,
    maxLength = 5,
    className,
    classNameIcon,
    render,
    ...props
}: StarsProps) {
    return (
        <div
            {...props}
            className={cn("flex items-center gap-1", className)}
            role="img"
            aria-label={`${length} out of ${maxLength} stars`}
            aria-valuenow={length}
            aria-valuemax={maxLength}
        >
            {[...Array(maxLength)].map(
                (_, index) =>
                    render?.(index) ?? (
                        <StarIcon
                            key={index}
                            className={cn(
                                "size-4 fill-current",
                                index < Math.round(length) && "text-yellow-400",
                                index >= Math.round(length) && "text-zinc-500",
                                classNameIcon,
                            )}
                        />
                    ),
            )}
        </div>
    );
}
