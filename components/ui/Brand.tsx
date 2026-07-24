export function Brand({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 font-bold tracking-tight text-slate-900 ${className}`}>
      <span className="inline-block h-2.5 w-2.5 rounded-full bg-gradient-to-br from-indigo-500 to-amber-400" />
      CalorieFit
    </span>
  );
}
