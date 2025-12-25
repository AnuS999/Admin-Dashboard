function SummaryCard({ title, value, growth, icon, bgColor, textColor, iconBgColor }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5 sm:p-6 border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
      <div className="flex items-center justify-between mb-4 sm:mb-5">
        <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${iconBgColor || bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
          <span className="text-xl sm:text-2xl">{icon}</span>
        </div>
        {growth && (
          <span className={`text-xs sm:text-sm font-semibold ${textColor} px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg ${bgColor} transition-all duration-300`}>
            {growth}
          </span>
        )}
      </div>
      <h3 className="text-gray-500 text-xs sm:text-sm font-medium mb-2 group-hover:text-gray-700 transition-colors duration-300 leading-tight">
        {title}
      </h3>
      <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors duration-300 tracking-tight">
        {value}
      </p>
    </div>
  );
}

export default SummaryCard;

