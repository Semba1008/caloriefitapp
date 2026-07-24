export function Card({
  title,
  children,
  className = "",
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl bg-white/90 p-5 shadow-sm shadow-slate-900/[0.03] ring-1 ring-slate-900/5 backdrop-blur-sm sm:p-6 ${className}`}
    >
      {title && (
        <h2 className="mb-4 text-sm font-semibold tracking-wide text-slate-500 uppercase">
          {title}
        </h2>
      )}
      {children}
    </div>
  );
}
