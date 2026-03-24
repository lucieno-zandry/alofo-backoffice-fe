import { CheckCheck, Copy } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

export type CodeBadgeProps = {
    code: string;
    onCopy: () => void;
    copied: boolean;
};

export function CodeBadge({ code, onCopy, copied }: CodeBadgeProps) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <button
                        onClick={onCopy}
                        className="font-mono text-sm font-semibold tracking-widest bg-muted px-3 py-1.5 rounded-md border hover:bg-muted/80 transition-colors flex items-center gap-2"
                    >
                        {code}
                        {copied ? (
                            <CheckCheck className="h-3.5 w-3.5 text-green-500" />
                        ) : (
                            <Copy className="h-3.5 w-3.5 text-muted-foreground" />
                        )}
                    </button>
                </TooltipTrigger>
                <TooltipContent>{copied ? "Copied!" : "Click to copy"}</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}