import { useEffect, useRef, useState } from "react";
import { cn } from "@/utils";

export type ImageGalleryProps = {
    images: string[];
    initialIndex?: number;
    classNameMain?: string;
    classNameThumb?: string;
    width?: number;
    height?: number;
} & Omit<React.ComponentProps<"div">, "children">;

export function ImageGallery({
    images,
    initialIndex = 0,
    width,
    height,
    className,
    classNameMain,
    classNameThumb,
}: ImageGalleryProps) {
    const [selectedIndex, setSelectedIndex] = useState(initialIndex);

    const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight") {
                e.preventDefault();
                const nextIndex =
                    selectedIndex === images.length - 1 ? 0 : selectedIndex + 1;
                setSelectedIndex(nextIndex);
                thumbnailRefs.current[nextIndex]?.focus();
            } else if (e.key === "ArrowLeft") {
                e.preventDefault();
                const prevIndex =
                    selectedIndex === 0 ? images.length - 1 : selectedIndex - 1;
                setSelectedIndex(prevIndex);
                thumbnailRefs.current[prevIndex]?.focus();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [selectedIndex, images.length]);

    if (images.length === 0) {
        return (
            <div className="rounded-xl bg-zinc-800 p-8">
                <div
                    style={{ width, height }}
                    className="grid place-items-center"
                >
                    <p>No images available</p>
                </div>
            </div>
        );
    }

    return (
        <div className={cn("flex flex-col gap-3", className)}>
            <div
                className={cn(
                    "grid place-items-center rounded-xl bg-zinc-800 p-8",
                    classNameMain,
                )}
            >
                <img
                    src={images[selectedIndex]}
                    alt={`Main image ${selectedIndex + 1}`}
                    width={width}
                    height={height}
                />
            </div>

            <div className="flex flex-wrap gap-3 overflow-x-auto">
                {images.map((img, index) => (
                    <button
                        key={img}
                        ref={el => {
                            thumbnailRefs.current[index] = el;
                        }}
                        onClick={() => setSelectedIndex(index)}
                        className={cn(
                            "cursor-pointer rounded-xl border-2 bg-zinc-800 p-2 focus:outline-none focus-visible:border-2 focus-visible:border-zinc-50",
                            index === selectedIndex
                                ? "!border-blue-500"
                                : "border-transparent",
                            classNameThumb,
                        )}
                    >
                        <img
                            src={img}
                            alt={`Thumbnail ${index + 1}`}
                            className="h-20 w-20 object-cover"
                        />
                    </button>
                ))}
            </div>
        </div>
    );
}
