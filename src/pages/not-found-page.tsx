import { Button } from "@/components/ui/button";
import { Wrapper } from "@/components/ui/wrapper";

export function NotFoundPage() {
    return (
        <Wrapper className="flex flex-col items-center justify-center text-center">
            <h1 className="text-xl font-bold sm:text-3xl">
                404 - Page Not Found
            </h1>
            <p className="mt-2 text-sm text-pretty sm:mt-3.5 sm:text-base">
                The page you are looking for does not exist or has been moved.
            </p>
            <Button asChild className="mt-4 w-full sm:mt-6 sm:w-auto" size="lg">
                <a href="/">Go to Home</a>
            </Button>
        </Wrapper>
    );
}

export default NotFoundPage;
