import { Outlet } from "react-router-dom";
import Navigation from "../navigation";

export function MainLayout() {
    return (
        <>
            <Navigation />
            <main className="max-w-screen-xl mx-auto px-4 py-4">
                <Outlet />
            </main>
        </>
    )
}
