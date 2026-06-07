const ProjectsSkeleton = () => {
  return (
    <div className="animate-pulse mt-6">
      {/* Project Cards */}
      <div className="flex flex-col gap-3 mt-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="border border-slate-200 rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <div className="h-5 w-40 bg-slate-200 rounded mb-2" />
                <div className="h-4 w-64 bg-slate-200 rounded" />
              </div>
            </div>

            <div className="mt-3">
              <div className="h-3 w-32 bg-slate-200 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsSkeleton;
