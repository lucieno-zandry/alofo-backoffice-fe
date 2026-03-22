// routes/backoffice/users/detail.tsx
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { toast } from "sonner";
import { UserDetailLayout } from "~/components/user-detail/user-detail-layout";
import { useUserDetailStore } from "~/hooks/use-user-detail-store";
import { updateUserStatus } from "~/api/http-requests";

export default function UserDetail() {
    const { userId, lang } = useParams<{ userId: string; lang: string }>();
    const { user, loading, error, fetchUser, clearUser } = useUserDetailStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (userId) {
            fetchUser(parseInt(userId));
        }
        return () => clearUser();
    }, [userId, fetchUser, clearUser]);

    const handleBack = () => navigate(`/${lang}/users`);

    const handleApprove = async () => {
        try {
            await updateUserStatus(Number(userId), { status: "approved" });
            toast.success("User approved successfully");
            fetchUser(Number(userId));
        } catch (err) {
            toast.error("Failed to approve user");
            console.error(err);
        }
    };

    const handleBlock = async () => {
        const reason = prompt("Reason for blocking:");
        if (reason === null) return;
        try {
            await updateUserStatus(Number(userId), { status: "blocked", reason });
            toast.success("User blocked successfully");
            fetchUser(Number(userId));
        } catch (err) {
            toast.error("Failed to block user");
            console.error(err);
        }
    };

    const handleSuspend = async () => {
        const reason = prompt("Reason for suspension:");
        if (reason === null) return;
        const expiresAt = prompt("Expiration date (YYYY-MM-DD) or leave empty for indefinite:");
        const payload: any = { status: "suspended", reason };
        if (expiresAt) payload.expires_at = expiresAt;
        try {
            await updateUserStatus(Number(userId), payload);
            toast.success("User suspended successfully");
            fetchUser(Number(userId));
        } catch (err) {
            toast.error("Failed to suspend user");
            console.error(err);
        }
    };

    const handleEdit = () => {
        // Optional: navigate to edit page
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