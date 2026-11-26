interface ConnectionStatusProps {
  connected: boolean;
  label: string;
}

export function ConnectionStatus({
  connected,
  label,
}: ConnectionStatusProps) {
  const tone = connected
    ? "bg-emerald-100 text-emerald-800"
    : "bg-amber-100 text-amber-900";
  const dot = connected ? "bg-emerald-600" : "bg-amber-600";

  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ${tone}`}>
      <span aria-hidden="true" className={`h-2 w-2 rounded-full ${dot}`} />
      API {label}
    </span>
  );
}
