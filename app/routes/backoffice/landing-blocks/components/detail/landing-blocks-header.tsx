import { LayoutList, Plus, RefreshCcw } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { useLandingBlockFormStore } from '../../stores/use-landing-block-form-store';
import { useLandingBlocks } from '../../hooks/use-landing-blocks';
import { useLandingBlocksStore } from '../../stores/use-landing-blocks-store';

// ── Dumb View ─────────────────────────────────────────────────────────────────

type LandingBlocksHeaderViewProps = {
    blockCount: number;
    activeCount: number;
    isLoading: boolean;
    onAddNew: () => void;
    onRefresh: () => void;
};

export function LandingBlocksHeaderView({
    blockCount,
    activeCount,
    isLoading,
    onAddNew,
    onRefresh,
}: LandingBlocksHeaderViewProps) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <LayoutList className="h-5 w-5 text-primary" />
                </div>
                <div>
                    <h1 className="text-xl font-bold leading-none">Landing Blocks</h1>
                    <p className="text-xs text-muted-foreground mt-1">
                        {blockCount} block{blockCount !== 1 ? 's' : ''}
                        {blockCount > 0 && (
                            <span className="ml-1.5">
                                · <span className="text-primary font-medium">{activeCount} active</span>
                            </span>
                        )}
                        <span className="ml-1.5 text-muted-foreground/60">· drag to reorder</span>
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={onRefresh}
                    disabled={isLoading}
                    className="gap-1.5 h-9"
                >
                    <RefreshCcw className={`h-3.5 w-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                    <span className="hidden sm:inline">Refresh</span>
                </Button>

                <Button onClick={onAddNew} size="sm" className="gap-1.5 h-9">
                    <Plus className="h-3.5 w-3.5" />
                    Add block
                </Button>
            </div>
        </div>
    );
}

// ── Smart Component ───────────────────────────────────────────────────────────

export function LandingBlocksHeader() {
    const { openCreate } = useLandingBlockFormStore();
    const { refetch, isLoading } = useLandingBlocks();
    const { blocks } = useLandingBlocksStore();

    const activeCount = blocks.filter((b) => b.is_active).length;

    return (
        <LandingBlocksHeaderView
            blockCount={blocks.length}
            activeCount={activeCount}
            isLoading={isLoading}
            onAddNew={openCreate}
            onRefresh={refetch}
        />
    );
}