import { Link } from "react-router";
import { Wrapper } from "@/components/ui/wrapper";
import { cn } from "@/utils";
import IpsumLogo from "@/assets/logos/logoipsum.svg?react";

export function AppHeader({
    className,
    ...props
}: Omit<React.ComponentProps<"header">, "children">) {
    return (
        <header
            {...props}
            className={cn(
                "grid min-h-16 items-center border-b border-zinc-700",
                className,
            )}
        >
            <Wrapper className="flex items-center justify-between">
                <Link to="/" className="rounded-md outline-offset-4">
                    <IpsumLogo aria-hidden="true" />
                    <span className="sr-only">Logo Ipsum</span>
                </Link>
            </Wrapper>
        </header>
    );
}
