// src/routes/backoffice/categories/components/category-sheet.tsx
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "~/components/ui/sheet";
import { CategoryForm } from "./category-form";

type CategorySheetProps = {
  isOpen: boolean;
  onClose: () => void;
  mode: "create" | "edit";
  initialData?: any;
};

export function CategorySheet({ isOpen, onClose, mode, initialData }: CategorySheetProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="right"
        // Swapping zinc for semantic variables
        className="w-full sm:max-w-md bg-card/90 backdrop-blur-2xl border-l border-border p-0 transition-colors duration-300"
      >
        <SheetHeader className="p-6 border-b border-border/50">
          <SheetTitle className="text-xl font-bold text-foreground">
            {mode === "create" ? "New Category" : "Edit Category"}
          </SheetTitle>
        </SheetHeader>

        <div className="p-6 h-[calc(100vh-85px)] overflow-y-auto custom-scrollbar">
          <CategoryForm
            initialData={initialData}
            onCancel={onClose}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}