import { Outlet, useLoaderData } from "react-router";
import Header from "~/components/layout/header";
import Sidebar from "~/components/layout/sidebar";
import backgroundImage from "~/assets/images/backround-image.jpg";
import { getCategories } from "~/api/http-requests";
import { useCategoryStore } from "~/hooks/use-category-store";
import { useEffect } from "react";

export async function loader() {
    const categoriesResponse = await getCategories();
    return { categories: categoriesResponse.data?.categories };
}

export default function AdminLayout() {
    const { categories: initialCategories = [] } = useLoaderData<typeof loader>();
    const setCategories = useCategoryStore((state) => state.setCategories);

    useEffect(() => {
        setCategories(initialCategories);
    }, [initialCategories, setCategories]);

    return (
        <div className="h-screen flex overflow-hidden p-2 gap-2" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover", backgroundPosition: "center" }}>
            {/* Sidebar now lives "inside" the flex flow on desktop */}
            <Sidebar />

            <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
                <Header />
                <main className="pt-2 overflow-y-auto custom-scrollbar">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}