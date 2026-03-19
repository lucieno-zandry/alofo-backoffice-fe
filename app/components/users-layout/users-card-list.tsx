// routes/backoffice/users/components/UsersCardListContainer.tsx
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import { useUsersStore } from "~/hooks/use-users-store";
import { Skeleton } from "~/components/ui/skeleton";
import { ScrollArea } from "~/components/ui/scroll-area";
import { UserCard } from "./user-card";
import { AlertCircle, Users } from "lucide-react";

export function UsersCardList() {
    const navigate = useNavigate();
    const params = useParams<{ userId?: string }>();
    const { users, loading, error, selectedUserId, setSelectedUserId } = useUsersStore();

    useEffect(() => {
        const id = params.userId ? parseInt(params.userId) : null;
        if (id !== selectedUserId) {
            setSelectedUserId(id);
        }
    }, [params.userId, selectedUserId, setSelectedUserId]);

    if (loading) {
        return (
            <div className="flex-1 space-y-px">
                {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-3 px-4 py-3 border-b border-border">
                        <Skeleton className="h-12 w-12 rounded-md" />
                        <div className="flex-1 space-y-2">
                            <Skeleton className="h-4 w-1/3" />
                            <Skeleton className="h-3 w-1/2" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center flex-1 p-8 text-center text-red-500">
                <AlertCircle className="h-8 w-8 mb-2 opacity-50" />
                <p className="text-sm font-medium">{error}</p>
            </div>
        );
    }

    if (users.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center flex-1 p-12 text-center text-muted-foreground">
                <Users className="h-10 w-10 mb-4 opacity-20" />
                <h3 className="text-sm font-medium">No users found</h3>
            </div>
        );
    }

    return (
        <ScrollArea className="flex-1 -mx-4">
            <div className="flex flex-col">
                {users.map((user) => (
                    <UserCard
                        key={user.id}
                        user={user}
                        isSelected={selectedUserId === user.id}
                        onClick={() => {
                            setSelectedUserId(user.id);
                            navigate(`/en/users/${user.id}`);
                        }}
                    />
                ))}
            </div>
        </ScrollArea>
    );
}