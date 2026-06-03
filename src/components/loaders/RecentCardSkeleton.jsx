
const RecentCardSkeleton = () => {
  return (
    <div className="bg-background border border-slate-300 rounded-md p-2 animate-pulse">
      <div className="flex justify-between">
        <div className="flex gap-2 items-start flex-1">
          {/* Folder Icon */}
          <div className="size-6 rounded bg-slate-200 mt-1" />

          {/* Content */}
          <div className="flex-1">
            <div className="h-5 w-32 bg-slate-200 rounded mb-2" />
            <div className="h-4 w-full max-w-56 bg-slate-200 rounded mb-1" />
            <div className="h-4 w-40 bg-slate-200 rounded" />
          </div>
        </div>

        {/* Arrow */}
        <div className="size-5 rounded bg-slate-200 self-center" />
      </div>
    </div>
  )
}

export default RecentCardSkeleton