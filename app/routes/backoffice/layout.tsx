import { Outlet, redirect, useLoaderData, type LoaderFunctionArgs } from "react-router";
import Header from "~/components/layout/header";
import Sidebar from "~/components/layout/sidebar";
import backgroundImage from "~/assets/images/backround-image.jpg";
import { getAuthUser, getCategories } from "~/api/http-requests";
import { useCategoryStore } from "~/hooks/use-category-store";
import { useEffect } from "react";
import { useAuthStore } from "~/hooks/use-auth-store";
import { HttpException } from "~/api/app-fetch";
import redirectPathnames from "~/lib/redirect-pathnames";

export async function clientLoader({ params }: LoaderFunctionArgs) {
    const lang = params.lang || 'en';

    try {
        const [categoriesResponse, authResponse] = await Promise.all([getCategories(), getAuthUser()]);
        const user = authResponse.data?.user;

        if (user?.role !== 'admin') throw new HttpException(403);
        if (!user?.approved_at) throw new HttpException(403, { action: 'APPROVE_ACCOUNT' });
        if (!user?.email_verified_at) throw new HttpException(403, { action: 'VERIFY_EMAIL' });

        return {
            categories: categoriesResponse.data?.categories,
            user
        };
    } catch (error) {
        if (error instanceof HttpException) {
            if (error.status === 401) {
                return redirect(`/${lang}/auth`);
            } else if (error.status === 403 && !error.data) {
                return redirect(`/${lang}/403`);
            } else if (error.status === 403 && error.data?.action) {
                const redirectPathname = redirectPathnames[error.data.action as keyof typeof redirectPathnames];
                return redirect(`/${lang}/${redirectPathname}`);
            }
        }
    }

    return redirect(`/${lang}/500`);
}

export default function AdminLayout() {
    const { categories: initialCategories = [], user = null } = useLoaderData<typeof clientLoader>();
    const setCategories = useCategoryStore((state) => state.setCategories);
    const { setUser } = useAuthStore();

    useEffect(() => {
        setCategories(initialCategories);
    }, [initialCategories, setCategories]);

    useEffect(() => {
        setUser(user)
    }, [user, setUser]);

    return (
        <div className="h-screen flex overflow-hidden p-2 gap-2" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover", backgroundPosition: "center" }}>
            {/* Sidebar now lives "inside" the flex flow on desktop */}
            <Sidebar />

            <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
                <Header />
                <main className="pt-2 overflow-y-auto custom-scrollbar pb-24">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}