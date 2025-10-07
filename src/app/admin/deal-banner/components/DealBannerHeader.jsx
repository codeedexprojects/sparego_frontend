export default function DealBannerHeader({
  bannerCount,
  onAddBanner,
  sections,
  selectedSection,
  onFilterChange,
}) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-4">
        <span className="font-medium">Total: {bannerCount}</span>
        <select
          value={selectedSection}
          onChange={(e) => onFilterChange("section", e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">All Sections</option>
          {sections?.map((sec) => (
            <option key={sec._id} value={sec._id}>
              {sec.name}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={onAddBanner}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Add Banner
      </button>
    </div>
  );
}
