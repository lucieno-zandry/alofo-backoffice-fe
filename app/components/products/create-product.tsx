import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { AlertCircle, ArrowLeft, ArrowRight, Loader2, Save } from "lucide-react";
import { useCreateProductPage } from "~/components/products/create-product-page.controller";
import { StepIndicator } from "~/components/products/step-indicator-view";
import { Step1Basics } from "~/components/products/step-1-basics.view";
import { Step2Groups } from "~/components/products/step-2-groups.view";
import { Step3Variants } from "~/components/products/step-3-variants.view";
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "../ui/sheet";
import { FloatingAddButton } from "../floating-add-button";


const STEP_TITLES: Record<number, { title: string; subtitle: string }> = {
    1: { title: "Product basics", subtitle: "Start with the essential details." },
    2: {
        title: "Variant groups",
        subtitle:
            "Define the dimensions that make variants different from each other.",
    },
    3: {
        title: "Variants",
        subtitle:
            "Each variant is a unique combination of options with its own SKU, price and stock.",
    },
};

export default function CreateProductSheet() {
    const ctrl = useCreateProductPage();

    const { title, subtitle } = STEP_TITLES[ctrl.step];

    const canGoNext =
        ctrl.step === 1
            ? ctrl.step1Valid
            : ctrl.step === 2
                ? true // step 2 is optional; always allow moving forward
                : false;

    const canSubmit = ctrl.step === 3 && ctrl.step1Valid && ctrl.step3Valid;

    return (<>
        <Sheet open={ctrl.isCreateProductSheetOpen} onOpenChange={ctrl.setIsCreateProductSheetOpen}>
            <SheetTitle className="sr-only">
                Create a product
            </SheetTitle>
            <SheetDescription className="sr-only">
                Follow the steps and fill out the forms to create a product
            </SheetDescription>
            <SheetContent side="bottom">
                <div className="flex flex-col h-screen bg-background">
                    {/* Top bar */}
                    <header className="flex items-center gap-4 px-6 py-3 border-b border-border shrink-0">
                        <Separator orientation="vertical" className="h-5" />

                        <StepIndicator
                            current={ctrl.step}
                            step1Valid={ctrl.step1Valid}
                            step2Valid={ctrl.step2Valid}
                            onGoTo={ctrl.goTo}
                        />
                    </header>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto">
                        <div className="max-w-3xl mx-auto px-6 py-8">
                            {/* Step header */}
                            <div className="mb-8">
                                <h1 className="text-xl font-bold">{title}</h1>
                                <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
                            </div>

                            {/* Step content */}
                            {ctrl.step === 1 && (
                                <Step1Basics
                                    draft={ctrl.draft}
                                    ctrl={{
                                        setBasics: ctrl.setBasics,
                                        setImages: ctrl.setImages,
                                        setTitleAndSlug: ctrl.setTitleAndSlug,
                                    }}
                                />
                            )}
                            {ctrl.step === 2 && (
                                <Step2Groups
                                    draft={ctrl.draft}
                                    ctrl={{
                                        addGroup: ctrl.addGroup,
                                        updateGroupName: ctrl.updateGroupName,
                                        removeGroup: ctrl.removeGroup,
                                        addOption: ctrl.addOption,
                                        updateOption: ctrl.updateOption,
                                        removeOption: ctrl.removeOption,
                                    }}
                                />
                            )}
                            {ctrl.step === 3 && (
                                <Step3Variants
                                    draft={ctrl.draft}
                                    ctrl={{
                                        applyGeneratedVariants: ctrl.applyGeneratedVariants,
                                        updateVariant: ctrl.updateVariant,
                                        removeVariant: ctrl.removeVariant,
                                        bulkSetVariants: ctrl.bulkSetVariants,
                                    }}
                                />
                            )}
                        </div>
                    </div>

                    {/* Footer nav */}
                    <footer className="shrink-0 border-t border-border px-6 py-3 flex items-center justify-between gap-4 bg-background">
                        {/* Submit error */}
                        {ctrl.submitError && (
                            <div className="flex items-center gap-2 text-sm text-destructive">
                                <AlertCircle className="w-4 h-4 shrink-0" />
                                {ctrl.submitError}
                            </div>
                        )}
                        {!ctrl.submitError && <div />}

                        <div className="flex items-center gap-2 ml-auto">
                            {ctrl.step > 1 && (
                                <Button variant="outline" onClick={ctrl.goPrev} className="gap-1.5">
                                    <ArrowLeft className="w-4 h-4" />
                                    Back
                                </Button>
                            )}

                            {ctrl.step < 3 && (
                                <Button
                                    onClick={ctrl.goNext}
                                    disabled={!canGoNext}
                                    className="gap-1.5"
                                >
                                    Continue
                                    <ArrowRight className="w-4 h-4" />
                                </Button>
                            )}

                            {ctrl.step === 3 && (
                                <Button
                                    onClick={ctrl.submit}
                                    disabled={!canSubmit || ctrl.isSubmitting}
                                    className="gap-2"
                                >
                                    {ctrl.isSubmitting ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <Save className="w-4 h-4" />
                                    )}
                                    {ctrl.isSubmitting ? "Creating…" : "Create product"}
                                </Button>
                            )}
                        </div>
                    </footer>
                </div>
            </SheetContent>
        </Sheet>

        <FloatingAddButton label="Add Product" onClick={() => ctrl.setIsCreateProductSheetOpen(true)} />
    </>
    );
}