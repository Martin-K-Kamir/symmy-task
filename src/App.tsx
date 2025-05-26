import { BrowserRouter, Route, Routes } from "react-router";
import { ErrorBoundary } from "react-error-boundary";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AppLayout } from "@/components/layouts/app-layout";
import { ProductsPage } from "@/features/products/products-page";
import { ProductDetailPage } from "@/features/products/product-detail-page";
import { ErrorPage } from "@/pages/error-page";
import { NotFoundPage } from "@/pages/not-found-page";

const queryClient = new QueryClient();

function App() {
    return (
        <ErrorBoundary fallback={<ErrorPage />}>
            <QueryClientProvider client={queryClient}>
                <ReactQueryDevtools initialIsOpen={false} />

                <BrowserRouter>
                    <Routes>
                        <Route element={<AppLayout />}>
                            <Route path="/" element={<ProductsPage />} />
                            <Route
                                path="products/:productId"
                                element={<ProductDetailPage />}
                            />
                            <Route path="*" element={<NotFoundPage />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </QueryClientProvider>
        </ErrorBoundary>
    );
}

export default App;
