import { Sheet, SheetContent, SheetDescription, SheetTitle } from "../ui/sheet";
import { FloatingAddButton } from "../floating-add-button";
import { TopBar } from "./top-bar";
import { StepHeader } from "./step-header";
import { StepContent } from "./step-content";
import FooterNav from "./footer-nav";
import { useProductEditor } from "./product-editor.controller";
import useProductEditorSheet from "~/hooks/use-product-editor-sheet";

const STEP_TITLES: Record<number, { title: string; subtitle: string }> = {
    1: { title: "Product basics", subtitle: "Start with the essential details." },
    2: { title: "Variant groups", subtitle: "Define the dimensions that make variants different from each other." },
    3: { title: "Variants", subtitle: "Each variant is a unique combination of options with its own SKU, price and stock." },
};

export default function ProductEditor() {
    const { open, setOpen } = useProductEditorSheet();
    const ctrl = useProductEditor();
    const { title, subtitle } = STEP_TITLES[ctrl.step];

    const canGoNext = ctrl.step === 1 ? ctrl.step1Valid : ctrl.step === 2 ? true : false;
    const canSubmit = ctrl.step === 3 && ctrl.step1Valid && ctrl.step3Valid;

    return (
        <>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTitle className="sr-only">Create a product</SheetTitle>
                <SheetDescription className="sr-only">Follow the steps and fill out the forms to create a product</SheetDescription>
                <SheetContent side="bottom">
                    <div className="flex flex-col h-screen bg-background">
                        <TopBar step={ctrl.step} step1Valid={ctrl.step1Valid} step2Valid={ctrl.step2Valid} onGoTo={ctrl.goTo} />

                        <div className="flex-1 overflow-y-auto">
                            <div className="max-w-3xl mx-auto px-6 py-8">
                                <StepHeader title={title} subtitle={subtitle} />
                                <StepContent step={ctrl.step} draft={ctrl.draft} ctrl={ctrl} />
                            </div>
                        </div>

                        <FooterNav
                            step={ctrl.step}
                            canGoNext={canGoNext}
                            canSubmit={canSubmit}
                            goPrev={ctrl.goPrev}
                            goNext={ctrl.goNext}
                            submit={ctrl.submit}
                            isSubmitting={ctrl.isSubmitting}
                            submitError={ctrl.submitError || undefined}
                            mode={ctrl.mode}
                        />
                    </div>
                </SheetContent>
            </Sheet>

            <FloatingAddButton label="Add Product" onClick={() => setOpen(true)} />
        </>
    );
}
