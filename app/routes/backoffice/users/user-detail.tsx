import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { UserDetailLayout } from "~/components/user-detail/user-detail-layout";
import { useUserDetailStore } from "~/hooks/use-user-detail-store";

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

    return (
        <UserDetailLayout
            user={user}
            loading={loading}
            error={error}
            onBack={handleBack}
        />
    );
}