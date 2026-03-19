// routes/backoffice/users/components/UsersList.tsx

import { UsersCardList } from "./users-card-list";
import { UsersFilters } from "./users-filters";
import { UsersPagination } from "./users-pagination";

export function UsersList() {
    return (
        <div className="flex flex-col h-full overflow-y-auto bg-background/80 backdrop-blur-md rounded-2xl border shadow-sm p-4">
            <UsersFilters />
            <UsersCardList />
            <UsersPagination />
        </div>
    );
}