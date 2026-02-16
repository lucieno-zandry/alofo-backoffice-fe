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
        // We override the default shadcn background with your glass style
        className="w-full sm:max-w-md bg-zinc-950/90 backdrop-blur-2xl border-l border-white/10 p-0 text-white"
      >
        <SheetHeader className="p-6 border-b border-white/5">
          <SheetTitle className="text-xl font-bold text-white">
            {mode === "create" ? "New Category" : "Edit Category"}
          </SheetTitle>
        </SheetHeader>

        <div className="p-6 h-[calc(100vh-85px)] overflow-y-auto custom-scrollbar">
          <CategoryForm 
            initialData={initialData} 
            onCancel={onClose}
            onSubmit={(e: any) => {
                e.preventDefault();
                // Handle logic
                onClose();
            }}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}