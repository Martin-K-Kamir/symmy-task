import { FullScreen } from "@/components/ui/full-screen";
import { Wrapper } from "@/components/ui/wrapper";

export function ErrorPage() {
    return (
        <FullScreen className="py-40" as="main">
            <Wrapper className="flex flex-col items-center justify-center text-center">
                <h1 className="text-xl font-bold sm:text-3xl">
                    Something went wrong
                </h1>
                <p className="mt-2 text-sm text-pretty sm:mt-3.5 sm:text-base">
                    An unexpected error has occurred. Please try again later.
                </p>
            </Wrapper>
        </FullScreen>
    );
}

export default ErrorPage;
