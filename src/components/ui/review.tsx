import { cn } from "@/utils";
import { Stars } from "@/components/ui/stars";

export function Review({
    className,
    ...props
}: React.ComponentProps<"article">) {
    return <article className={cn("space-y-2", className)} {...props} />;
}

export function ReviewDate({ date }: { date: string }) {
    return (
        <time dateTime={date} className="text-xs text-zinc-300">
            {new Date(date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
            })}
        </time>
    );
}

export function ReviewRating({ rating }: { rating: number }) {
    return <Stars length={rating} classNameIcon="size-3.5" />;
}

export function ReviewName({ name }: { name: string }) {
    return <p className="font-semibold text-zinc-50">{name}</p>;
}

export function ReviewDescription({ description }: { description: string }) {
    return <p className="text-zinc-50">{description}</p>;
}

export function SimpleReview({
    date,
    rating,
    name,
    description,
    ...props
}: {
    className?: string;
    date: string;
    rating: number;
    name: string;
    description: string;
} & React.ComponentProps<typeof Review>) {
    return (
        <Review {...props}>
            <header className="flex items-start justify-between">
                <div>
                    <ReviewName name={name} />
                    <ReviewDate date={date} />
                </div>
                <ReviewRating rating={rating} />
            </header>
            <ReviewDescription description={description} />
        </Review>
    );
}
