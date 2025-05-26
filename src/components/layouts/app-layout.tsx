import { Outlet } from "react-router";
import { AppHeader } from "@/components/layouts/app-header";
import { FullScreen } from "../ui/full-screen";

export function AppLayout() {
    return (
        <FullScreen>
            <AppHeader />

            <main className="flex-1 py-8 sm:py-10 lg:py-14">
                <Outlet />
            </main>
        </FullScreen>
    );
}
