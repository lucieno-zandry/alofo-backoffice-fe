import { Layers } from "lucide-react";
import { Badge } from "~/components/ui/badge";

export function CategoryBadge({ category }: { category?: { title: string } }) {
  if (!category) return null;

  return (
    <div className="flex items-center gap-2">
      <Layers className="w-4 h-4 text-muted-foreground" />
      <Badge variant="outline">{category.title}</Badge>
    </div>
  );
}
