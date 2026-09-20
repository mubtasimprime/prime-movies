export default function Loading({ label = 'Loading movies…' }) {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4">
      <span className="loading loading-spinner loading-lg text-primary" />
      <p className="text-base-content/60">{label}</p>
    </div>
  )
}
