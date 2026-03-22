// routes/backoffice/users/detail.tsx
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { toast } from "sonner";
import { UserDetailLayout } from "~/components/user-detail/user-detail-layout";
import { useUserDetailStore } from "~/hooks/use-user-detail-store";
import { updateUserStatus } from "~/api/http-requests";
import { useUsersStore } from "~/hooks/use-users-store";

export default function UserDetail() {
    const { userId, lang } = useParams<{ userId: string; lang: string }>();
    const { user, loading, error, fetchUser, clearUser } = useUserDetailStore();
    const { fetchUsers } = useUsersStore();

    const navigate = useNavigate();

    useEffect(() => {
        if (userId) {
            fetchUser(parseInt(userId));
        }
        return () => clearUser();
    }, [userId, fetchUser, clearUser]);

    const handleBack = () => navigate(`/${lang}/users`);

    const onActionSuccess = () => {
        fetchUser(Number(userId));
        fetchUsers();
    }

    const handleApprove = async () => {
        toast.promise(
            () => updateUserStatus(
                Number(userId),
                {
                    status: "approved"
                }).then(onActionSuccess),
            {
                loading: 'Approving...',
                success: 'User approved successfully',
                error: 'Can not approve user.'
            });
    };

    const handleBlock = async (reason: string) => {
        toast.promise(
            () => updateUserStatus(
                Number(userId),
                {
                    status: "blocked"
                }).then(onActionSuccess),
            {
                loading: 'Blocking...',
                success: 'User blocked successfully',
                error: 'Can not block user.'
            });
    };

    const handleSuspend = async (reason: string, expiresAt?: string) => {
        toast.promise(
            () => updateUserStatus(
                Number(userId),
                {
                    status: "suspended"
                }).then(onActionSuccess),
            {
                loading: 'Suspending...',
                success: 'User suspended successfully',
                error: 'Can not suspend user.'
            });
    };

    const handleEdit = () => {
        navigate(`/${lang}/users/${userId}/edit`);
    };

    return (
        <UserDetailLayout
            user={user}
            loading={loading}
            error={error}
            onBack={handleBack}
            onApprove={handleApprove}
            onBlock={handleBlock}
            onSuspend={handleSuspend}
            onEdit={handleEdit}
        />
    );
}