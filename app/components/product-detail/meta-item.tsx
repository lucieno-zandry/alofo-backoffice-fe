function MetaItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2 text-xs text-muted-foreground">
      <Icon className="w-3.5 h-3.5 shrink-0" />
      <span className="text-foreground font-medium">{label}:</span>
      <span>{value}</span>
    </div>
  );
}

export default MetaItem;