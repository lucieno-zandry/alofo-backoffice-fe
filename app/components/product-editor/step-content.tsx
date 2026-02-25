import { Step1Basics } from "~/components/product-editor/step-1-basics.view";
import { Step2Groups } from "~/components/product-editor/step-2-groups.view";
import { Step3Variants } from "~/components/product-editor/step-3-variants.view";
import type { useProductEditor } from "./product-editor.controller";

export function StepContent({ step, draft, ctrl }: {
    step: number;
    draft: any;
    ctrl: ReturnType<typeof useProductEditor>;
}) {
    if (step === 1) {
        return (
            <Step1Basics
                draft={draft}
                ctrl={{
                    setBasics: ctrl.setBasics,
                    addImages: ctrl.addImages,
                    setTitleAndSlug: ctrl.setTitleAndSlug,
                    removeImage: ctrl.removeImage,
                }}
            />
        );
    }
    if (step === 2) {
        return (
            <Step2Groups
                draft={draft}
                ctrl={{
                    addGroup: ctrl.addGroup,
                    updateGroupName: ctrl.updateGroupName,
                    removeGroup: ctrl.removeGroup,
                    addOption: ctrl.addOption,
                    updateOption: ctrl.updateOption,
                    removeOption: ctrl.removeOption,
                }}
            />
        );
    }
    if (step === 3) {
        return (
            <Step3Variants
                draft={draft}
                ctrl={{
                    applyGeneratedVariants: ctrl.applyGeneratedVariants,
                    updateVariant: ctrl.updateVariant,
                    removeVariant: ctrl.removeVariant,
                    bulkSetVariants: ctrl.bulkSetVariants,
                }}
            />
        );
    }
    return null;
}
