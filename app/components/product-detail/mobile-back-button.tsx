import { Button } from "~/components/ui/button";
import { X } from "lucide-react";

export function MobileBackButton({ onClose }: { onClose: () => void }) {
  return (
    <div className="md:hidden absolute top-4 right-4 z-10">
      <Button size="icon" variant="ghost" onClick={onClose} className="rounded-full">
        <X className="w-4 h-4" />
      </Button>
    </div>
  );
}
