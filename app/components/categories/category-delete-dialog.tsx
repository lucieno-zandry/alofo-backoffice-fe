// ~/components/categories/category-delete-dialog.tsx
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "~/components/ui/alert-dialog";
import { useFetcher } from "react-router";

export function CategoryDeleteDialog({
    category,
    isOpen,
    onClose
}: {
    category: Category | null,
    isOpen: boolean,
    onClose: () => void
}) {
    const fetcher = useFetcher();

    const handleDelete = () => {
        if (!category) return;
        fetcher.submit(
            { intent: "delete", id: category.id.toString() },
            { method: "post" }
        );
        onClose();
    };

    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent className="bg-card/80 backdrop-blur-2xl border-border shadow-2xl">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-foreground">Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription className="text-muted-foreground">
                        This will permanently delete the category <strong className="text-foreground">"{category?.title}"</strong>.
                        Note: If this category has children, they may become orphaned or deleted depending on your database constraints.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="bg-transparent border-border hover:bg-accent text-foreground">
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleDelete}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                        Delete Category
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}