import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils";

export const buttonVariants = cva(
    "inline-flex items-center focus-visible:ring-2 cursor-pointer justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all aria-[disabled=true]:pointer-events-none disabled:pointer-events-none aria-[disabled=true]:opacity-50 disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none",
    {
        variants: {
            variant: {
                default:
                    "border border-blue-500 bg-blue-700 text-zinc-50 hover:bg-blue-600 ring-blue-400",
                outline:
                    "border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 hover:text-zinc-50 ring-zinc-200/30",
                ghost: "text-zinc-100 hover:bg-zinc-800 hover:text-zinc-50 ring-zinc-200",
            },
            size: {
                default: "h-9 px-4 py-2 has-[>svg]:px-3",
                sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
                lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
                icon: "size-9",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    },
);

export function Button({
    className,
    variant,
    size,
    asChild = false,
    ...props
}: React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
        asChild?: boolean;
    }) {
    const Comp = asChild ? Slot : "button";

    return (
        <Comp
            data-slot="button"
            className={cn(buttonVariants({ variant, size, className }))}
            {...props}
        />
    );
}
