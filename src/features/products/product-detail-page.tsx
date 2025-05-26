import {
    ChevronLeftIcon,
    LoaderCircleIcon,
    TriangleAlertIcon,
} from "lucide-react";
import { Link, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Stars } from "@/components/ui/stars";
import { Wrapper } from "@/components/ui/wrapper";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { SimpleReview } from "@/components/ui/review";
import { ImageGallery } from "@/components/ui/image-gallery";
import { ProductPrice } from "@/features/products/product-price";
import { getProductById } from "@/services";
import { assertProductIdExists } from "@/utils";

export function ProductDetailPage() {
    const { productId } = useParams();
    assertProductIdExists(productId);

    const { data, isPending, error } = useQuery({
        queryKey: ["product", productId],
        queryFn: () => getProductById(productId),
        refetchOnWindowFocus: false,
    });

    if (isPending) {
        return (
            <Wrapper className="grid place-items-center py-20">
                <LoaderCircleIcon className="size-8 animate-spin" />
            </Wrapper>
        );
    }

    if (error) {
        return (
            <Wrapper className="flex flex-col items-center gap-2 py-20 text-rose-500">
                <TriangleAlertIcon />
                An error occurred while fetching the product
            </Wrapper>
        );
    }

    return (
        <Wrapper className="max-w-2xl lg:max-w-6xl">
            <Button asChild variant="ghost" className="mb-3 gap-1.5">
                <Link to="/">
                    <ChevronLeftIcon className="translate-y-px" />
                    Back
                </Link>
            </Button>

            <div className="grid items-start gap-6 lg:grid-cols-2 lg:gap-10">
                <div>
                    <ImageGallery
                        images={data.images}
                        width={452}
                        height={452}
                    />
                </div>

                <div className="space-y-2 sm:space-y-3">
                    <h1 className="text-xl font-semibold sm:text-3xl">
                        {data.title}
                    </h1>
                    <ProductPrice
                        price={data.price}
                        discountPercent={data.discountPercentage}
                        className="text-lg text-zinc-50 sm:text-xl"
                    />
                    <Stars length={data.rating} maxLength={5} />
                    <p className="text-sm text-zinc-300 sm:text-base">
                        {data.description}
                    </p>
                    <Button className="mt-6 w-full lg:w-1/2" size="lg">
                        Add to Cart
                    </Button>

                    <Accordion
                        type="single"
                        collapsible
                        className="mt-3 sm:mt-4"
                    >
                        <AccordionItem value="item-1">
                            <AccordionTrigger>Reviews</AccordionTrigger>
                            <AccordionContent>
                                {data.reviews.length === 0 ? (
                                    <p className="text-zinc-300">
                                        No reviews yet
                                    </p>
                                ) : (
                                    <ul className="space-y-4 divide-y divide-zinc-700 [&>li:not(:last-child)]:pb-4">
                                        {data.reviews.map(review => (
                                            <li
                                                key={
                                                    review.reviewerName +
                                                    review.date
                                                }
                                            >
                                                <SimpleReview
                                                    date={review.date}
                                                    rating={review.rating}
                                                    name={review.reviewerName}
                                                    description={review.comment}
                                                />
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>
                                Shipping & Returns
                            </AccordionTrigger>
                            <AccordionContent>
                                <ul className="list-disc space-y-0.5 pl-5 text-zinc-300">
                                    <li>{data.shippingInformation}</li>
                                    <li>{data.returnPolicy}</li>
                                    <li>{data.warrantyInformation}</li>
                                </ul>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>Product Details</AccordionTrigger>
                            <AccordionContent>
                                <ul className="list-disc space-y-0.5 pl-5 text-zinc-300">
                                    <li>Brand: {data.brand}</li>
                                    <li>Category: {data.category}</li>
                                    <li>Weight: {data.weight} g</li>
                                    <li>
                                        Dimensions: {data.dimensions.width} x{" "}
                                        {data.dimensions.height} x{" "}
                                        {data.dimensions.depth} mm
                                    </li>
                                </ul>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>
        </Wrapper>
    );
}
