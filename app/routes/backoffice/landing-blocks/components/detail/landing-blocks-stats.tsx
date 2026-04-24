import { Eye, EyeOff, LayoutList, Layers } from 'lucide-react';
import { Card, CardContent } from '~/components/ui/card';
import { useLandingBlocksStore } from '../../stores/use-landing-blocks-store';
import { BLOCK_TYPE_LABELS } from '../../helpers/data';

// ── Dumb View ─────────────────────────────────────────────────────────────────

type StatsData = {
    total: number;
    active: number;
    inactive: number;
    withRelations: number;
};

type LandingBlocksStatsViewProps = {
    stats: StatsData;
};

function StatCard({ icon, label, value, accent }: {
    icon: React.ReactNode;
    label: string;
    value: number;
    accent?: string;
}) {
    return (
        <Card className="border-border/50">
            <CardContent className="p-4 flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${accent ?? 'bg-muted'}`}>
                    {icon}
                </div>
                <div>
                    <p className="text-2xl font-bold leading-none">{value}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
                </div>
            </CardContent>
        </Card>
    );
}

export function LandingBlocksStatsView({ stats }: LandingBlocksStatsViewProps) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <StatCard
                icon={<LayoutList className="h-4 w-4 text-primary" />}
                label="Total blocks"
                value={stats.total}
                accent="bg-primary/10"
            />
            <StatCard
                icon={<Eye className="h-4 w-4 text-emerald-600" />}
                label="Active"
                value={stats.active}
                accent="bg-emerald-500/10"
            />
            <StatCard
                icon={<EyeOff className="h-4 w-4 text-muted-foreground" />}
                label="Inactive"
                value={stats.inactive}
                accent="bg-muted"
            />
            <StatCard
                icon={<Layers className="h-4 w-4 text-violet-600" />}
                label="Linked"
                value={stats.withRelations}
                accent="bg-violet-500/10"
            />
        </div>
    );
}

// ── Smart Component ───────────────────────────────────────────────────────────

export function LandingBlocksStats() {
    const { blocks } = useLandingBlocksStore();

    const stats: StatsData = {
        total: blocks.length,
        active: blocks.filter((b) => b.is_active).length,
        inactive: blocks.filter((b) => !b.is_active).length,
        withRelations: blocks.filter((b) => b.landing_able_id !== null).length,
    };

    return <LandingBlocksStatsView stats={stats} />;
}