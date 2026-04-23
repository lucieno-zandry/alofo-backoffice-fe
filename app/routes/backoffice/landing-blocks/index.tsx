import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert';
import { Button } from '~/components/ui/button';
import { LandingBlocksHeader } from './components/detail/landing-blocks-header';
import { LandingBlocksStats } from './components/detail/landing-blocks-stats';
import { LandingBlockList } from './components/list/landing-block-list';
import { LandingBlockListSkeleton } from './components/list/landing-block-list-skeleton';
import { LandingBlockFormDrawer } from './components/form/landing-block-form-drawer';
import { LandingBlockDeleteDialog } from './components/form/landing-block-delete-dialog';
import { useLandingBlocks } from './hooks/use-landing-blocks';

// ── Dumb View ─────────────────────────────────────────────────────────────────

type LandingBlocksPageViewProps = {
    isLoading: boolean;
    error: string | null;
    onRetry: () => void;
};

function LandingBlocksPageView({ isLoading, error, onRetry }: LandingBlocksPageViewProps) {
    return (
        <div className="bg-background/80 backdrop-blur-md h-full overflow-y-auto rounded-2xl">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
                {/* Header */}
                <LandingBlocksHeader />

                {/* Stats */}
                <LandingBlocksStats />

                {/* Error state */}
                {error && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Failed to load</AlertTitle>
                        <AlertDescription className="flex items-center justify-between gap-2 flex-wrap">
                            <span>{error}</span>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={onRetry}
                                className="shrink-0 border-destructive text-destructive hover:bg-destructive/5"
                            >
                                Try again
                            </Button>
                        </AlertDescription>
                    </Alert>
                )}

                {/* List / skeleton */}
                {isLoading ? <LandingBlockListSkeleton /> : <LandingBlockList />}
            </div>

            {/* Drawers & Dialogs (portaled to body) */}
            <LandingBlockFormDrawer />
            <LandingBlockDeleteDialog />
        </div>
    );
}

// ── Smart Component (Page) ────────────────────────────────────────────────────

export default function LandingBlocksPage() {
    const { isLoading, error, refetch } = useLandingBlocks();

    return (
        <LandingBlocksPageView
            isLoading={isLoading}
            error={error}
            onRetry={refetch}
        />
    );
}