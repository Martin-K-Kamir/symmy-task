import { AnyComponent } from "@/components/ui/any-component";
import { cn } from "@/utils";

export function FullScreen({
    as: Comp = "div",
    className,
    ...props
}: React.ComponentProps<typeof AnyComponent>) {
    return (
        <Comp
            {...props}
            className={cn(
                "flex min-h-svh flex-col bg-zinc-900 text-zinc-50",
                className,
            )}
        />
    );
}
