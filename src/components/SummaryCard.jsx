function SummaryCard({ title, value, growth, icon, bgColor, textColor, iconBgColor }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg ${iconBgColor || bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
          <span className="text-2xl">{icon}</span>
        </div>
        {growth && (
          <span className={`text-sm font-semibold ${textColor} px-2 py-1 rounded-md ${bgColor} transition-all duration-300`}>
            {growth}
          </span>
        )}
      </div>
      <h3 className="text-gray-500 text-sm font-medium mb-1 group-hover:text-gray-700 transition-colors duration-300">
        {title}
      </h3>
      <p className="text-2xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors duration-300">
        {value}
      </p>
    </div>
  );
}

export default SummaryCard;

