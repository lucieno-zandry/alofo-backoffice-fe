import React from "react"
import { Button } from "~/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "~/components/ui/dialog"
import { useAuthStore } from "~/hooks/use-auth-store"
import appNavigate from "~/lib/app-navigate"

export type LogoutDialogProps = {
    open: boolean,
    onOpenChange: (open: boolean) => void,
}

export function LogoutDialog({ open, onOpenChange }: LogoutDialogProps) {
    const { setUser } = useAuthStore();

    const handleLogout = React.useCallback(() => {
        setUser(null);
        localStorage.removeItem('token');
        appNavigate('/auth');
    }, [setUser]);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md" aria-describedby="Confirm logout">
                <DialogHeader>
                    <DialogTitle>Logout?</DialogTitle>
                    <DialogDescription>
                        Your session will be terminated!
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button variant="destructive" onClick={handleLogout}> Log out</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
