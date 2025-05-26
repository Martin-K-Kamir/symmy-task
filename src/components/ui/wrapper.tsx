import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils";
import { AnyComponent } from "@/components/ui/any-component";

export const wrapperVariants = cva("mx-auto px-6 sm:px-10 w-full", {
    variants: {
        size: {
            sm: "max-w-5xl",
            md: "max-w-6xl",
            lg: "max-w-7xl",
        },
    },
    defaultVariants: {
        size: "md",
    },
});

export function Wrapper({
    as: Comp = "div",
    className,
    size,
    ...props
}: React.ComponentProps<typeof AnyComponent> &
    VariantProps<typeof wrapperVariants>) {
    return (
        <Comp {...props} className={cn(wrapperVariants({ size, className }))} />
    );
}
