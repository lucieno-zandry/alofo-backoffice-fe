import { Outlet, useParams } from "react-router";
import { UsersList } from "../../../components/users-layout/users-list";

export default function UsersLayout() {
    const { userId } = useParams();

    return (
        <div className="flex h-full gap-4">
            {/* Left column – list */}
            <div
                className={`${userId ? "hidden md:block" : "block"
                    } w-full md:w-1/3 md:min-w-[320px]`}
            >
                <UsersList />
            </div>

            {/* Right column – detail */}
            <div
                className={`${!userId ? "hidden md:block" : "block"
                    } flex-1`}
            >
                <Outlet />
            </div>
        </div>
    );
}