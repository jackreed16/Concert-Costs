export function EmptyState({
  title = "No concerts logged yet",
  message = "Add your first concert to start seeing your dashboard.",
  action,
}: {
  title?: string;
  message?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="card bg-base-100 border border-dashed border-base-300 shadow-sm">
      <div className="card-body items-center text-center py-12">
        <div className="text-5xl mb-2" aria-hidden>
          🎵
        </div>
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="opacity-70 max-w-md">{message}</p>
        {action && <div className="mt-4">{action}</div>}
      </div>
    </div>
  );
}
