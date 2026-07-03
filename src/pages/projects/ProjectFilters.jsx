const ProjectFilters = ({
  searchQuery,
  setSearhQuery,
  currentFilter,
  setCurrentFilter,
}) => {
  return (
    <div className="flex gap-1 mt-4">
      {/* search and filters */}
      <input
        type="search"
        name=""
        value={searchQuery}
        onChange={(e) => setSearhQuery(e.target.value)}
        placeholder="Search by name"
        className="border border-slate-200 focus:border-slate-200 focus:outline-none transition-all duration-200 px-2 py-1 rounded-md flex-1 min-w-0"
      />

      <select
        name=""
        value={currentFilter}
        onChange={(e) => setCurrentFilter(e.target.value)}
        className="border border-slate-200 focus:border-slate-200 focus:outline-none transition-all duration-200 px-2 py-1 rounded-md shrink-0"
      >
        <option value="all">All</option>
        <option value="atoz">A-Z</option>
        <option value="ztoa">Z-A</option>
        <option value="date_created">Date created</option>
      </select>
    </div>
  );
};

export default ProjectFilters;
