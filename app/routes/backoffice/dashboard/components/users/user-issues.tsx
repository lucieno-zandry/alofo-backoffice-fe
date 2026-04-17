import { useParams } from "react-router";
import { useDashboardStore } from "../../stores/use-dashboard-store";
import { useDashboardData } from "../../hooks/use-dashboard-data";
import { UserIssuesView } from "./user-issues-view";

export function UserIssues() {
  const { userIssues, loading } = useDashboardStore();
  const { refresh } = useDashboardData();
  const params = useParams();
  const lang = (params as any).lang ?? "en";

  return (
    <UserIssuesView
      users={userIssues}
      loading={loading.users}
      onRefresh={refresh.users}
      lang={lang}
    />
  );
}