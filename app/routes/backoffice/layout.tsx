import { Outlet } from "react-router";
import Header from "~/components/layout/header";
import Sidebar from "~/components/layout/sidebar";
import backgroundImage from "~/assets/images/backround-image.webp";


export default function AdminLayout() {
    return (
        <div className="h-screen flex overflow-hidden p-2 gap-2" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover", backgroundPosition: "center" }}>
            {/* Sidebar now lives "inside" the flex flow on desktop */}
            <Sidebar />

            <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
                <Header />
                <main className="p-6 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}