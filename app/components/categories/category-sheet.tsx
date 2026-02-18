// src/routes/backoffice/categories/components/category-sheet.tsx
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "~/components/ui/sheet";
import { CategoryForm } from "./category-form";
import { useState, type SubmitEventHandler } from "react";
import { HttpException, ValidationException } from "~/api/app-fetch";
import { toast } from "sonner";
import { createCategory, updateCategory } from "~/api/http-requests";
import { useRevalidator } from "react-router";

type CategorySheetProps = {
  isOpen: boolean;
  onClose: () => void;
  mode: "create" | "edit";
  initialData?: any;
  onSubmit: SubmitEventHandler<HTMLFormElement>;
  isLoading: boolean;
  actionData: ValidationException | HttpException | null;
};

const action = (formData: FormData, mode: 'create' | 'edit') => {
  return mode === "create" ? createCategory(formData) : updateCategory(formData.get('id'), formData);
}

export function CategorySheetView({ isOpen, onClose, mode, initialData, onSubmit, isLoading, actionData }: CategorySheetProps) {
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
            onSubmit={onSubmit}
            isLoading={isLoading}
            actionData={actionData}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}

export function CategorySheet(props: Omit<CategorySheetProps, 'onSubmit' | 'isLoading' | 'actionData'>) {
  const [actionData, setActionData] = useState<ValidationException | HttpException | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const revalidator = useRevalidator();

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);

    action(formData, props.mode)
      .then(() => {
        toast.success(`Category ${props.mode === "create" ? "created" : "updated"} successfully!`);
        props.onClose();
        revalidator.revalidate();
        setActionData(null);
      })
      .catch(e => {
        setActionData(e);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  return <CategorySheetView {...props} onSubmit={handleSubmit} isLoading={isLoading} actionData={actionData} />;
}