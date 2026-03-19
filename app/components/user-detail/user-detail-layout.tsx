import { Skeleton } from "~/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { CheckCircle2, Clock, Mail, Calendar, Edit, Ban, ShieldAlert, ChevronLeft } from "lucide-react";
import { UserDetailTabs } from "./user-detail-tabs";

interface UserDetailLayoutProps {
    user: User | null;
    loading: boolean;
    error: string | null;
    onBack?: () => void;
}

export function UserDetailLayout({ user, loading, error, onBack }: UserDetailLayoutProps) {
    if (loading) {
        return (
            <div className="space-y-4">
                <Skeleton className="h-40 w-full rounded-xl" />
                <Skeleton className="h-[500px] w-full rounded-xl" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center rounded-xl border border-red-100 bg-red-50/50 p-8 text-red-600">
                <ShieldAlert className="h-8 w-8 mb-2 opacity-50" />
                <p className="font-medium">Failed to load user profile</p>
                <p className="text-sm opacity-80">{error}</p>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex h-full items-center justify-center rounded-xl border border-dashed text-muted-foreground p-8 bg-muted/20">
                Select a user to view their detailed profile.
            </div>
        );
    }

    const getRoleBadgeVariant = (role: string) => {
        switch (role.toLowerCase()) {
            case "admin": return "destructive";
            case "manager": return "default";
            case "client": return "secondary";
            default: return "outline";
        }
    };

    return (
        <div className="space-y-6 bg-background/80 backdrop-static-md p-2 rounded-2xl h-full overflow-y-auto">
            {onBack && (
                <Button
                    variant="ghost"
                    size="sm"
                    className="md:hidden mb-2 -ml-2"
                    onClick={onBack}
                >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Back to list
                </Button>
            )}
            <Card className="overflow-hidden shadow-sm">
                <div className="h-20 bg-muted border-b border-border/50"></div>
                <CardContent className="p-6 pt-0 sm:flex sm:items-end sm:justify-between">
                    <div className="sm:flex sm:gap-6 sm:items-end">
                        <Avatar className="h-24 w-24 rounded-xl border-4 border-background shadow-sm -mt-10 bg-muted">
                            <AvatarImage src={user.avatar_image?.url} className="object-cover" />
                            <AvatarFallback className="text-3xl rounded-xl">
                                {user.name.charAt(0).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>

                        <div className="mt-4 sm:mt-0 space-y-1.5 pb-1">
                            <div className="flex items-center gap-3">
                                <h2 className="text-2xl font-bold tracking-tight">{user.name}</h2>
                                <Badge variant={getRoleBadgeVariant(user.role)} className="uppercase text-[10px] tracking-wider">
                                    {user.role}
                                </Badge>
                            </div>

                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1.5">
                                    <Mail className="h-4 w-4 opacity-70" /> {user.email}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Calendar className="h-4 w-4 opacity-70" /> Joined {new Date(user.created_at).toLocaleDateString()}
                                </span>
                                <span className="flex items-center gap-1.5 font-medium">
                                    {user.approved_at ? (
                                        <>
                                            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                            <span className="text-emerald-600 dark:text-emerald-500">Approved</span>
                                        </>
                                    ) : (
                                        <>
                                            <Clock className="h-4 w-4 text-amber-500" />
                                            <span className="text-amber-600 dark:text-amber-500">Pending</span>
                                        </>
                                    )}
                                </span>
                                {user.client_code && (
                                    <span className="flex items-center gap-1.5 bg-muted px-2 py-0.5 rounded-md text-foreground">
                                        <span className="opacity-70">Code:</span> <span className="font-mono">{user.client_code.code}</span>
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex items-center gap-2 sm:mt-0 pb-1">
                        <Button variant="outline" size="sm" className="gap-2">
                            <Edit className="h-4 w-4" /> Edit Profile
                        </Button>
                        <Button variant="destructive" size="sm" className="gap-2">
                            <Ban className="h-4 w-4" /> Suspend
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <UserDetailTabs user={user} />
        </div>
    );
}