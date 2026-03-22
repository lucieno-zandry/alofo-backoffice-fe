// routes/backoffice/users/components/UserActions.tsx
import { Button } from "~/components/ui/button";
import { Edit, Ban, CheckCircle2, ShieldAlert } from "lucide-react";
import { isUserApproved } from "~/lib/user-status";

interface UserActionsProps {
    user: User;
    onEdit?: () => void;
    onApprove?: () => void;
    onBlock?: () => void;
    onSuspend?: () => void;
}

export function UserActions({ user, onEdit, onApprove, onBlock, onSuspend }: UserActionsProps) {
    const approved = isUserApproved(user);

    return (
        <div className="mt-6 flex items-center gap-2 sm:mt-0 pb-1">
            <Button variant="outline" size="sm" className="gap-2" onClick={onEdit}>
                <Edit className="h-4 w-4" /> Edit Profile
            </Button>

            {!approved && (
                <Button variant="default" size="sm" className="gap-2 bg-emerald-600 hover:bg-emerald-700" onClick={onApprove}>
                    <CheckCircle2 className="h-4 w-4" /> Approve
                </Button>
            )}

            {approved && (
                <>
                    <Button variant="destructive" size="sm" className="gap-2" onClick={onBlock}>
                        <Ban className="h-4 w-4" /> Block
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2 border-amber-600 text-amber-600 hover:bg-amber-50" onClick={onSuspend}>
                        <ShieldAlert className="h-4 w-4" /> Suspend
                    </Button>
                </>
            )}
        </div>
    );
}