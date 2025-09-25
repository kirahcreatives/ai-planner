import PropTypes from 'prop-types';

const ExtrasList = ({ extras }) => {
  if (!extras || extras.length === 0) return null;

  const categoryColors = {
    restaurant: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    museum: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    attraction: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    shopping: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    nightlife: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
    activity: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    default: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
  };

  const getColorClass = (category) => categoryColors[category?.toLowerCase()] || categoryColors.default;

  const renderRatingBadge = (rating) => (
    <span className="inline-flex items-center px-2 py-0.5 text-xs text-gray-600 dark:text-gray-300">
      <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
      {rating}
    </span>
  );

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-4">
        {extras.map((extra) => (
          <div key={extra.id} className="group p-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                  {extra.name}
                </h3>
                <div className="mt-1 flex flex-wrap gap-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getColorClass(extra.category)}`}>
                    {extra.category}
                  </span>
                  {extra.rating && renderRatingBadge(extra.rating)}
                </div>
                {extra.description && (
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{extra.description}</p>
                )}
              </div>
              {extra.distance && (
                <span className="ml-4 flex-shrink-0 text-sm text-gray-500 dark:text-gray-400">
                  {extra.distance}
                </span>
              )}
              <div className="ml-4 text-gray-400 dark:text-gray-500 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-200">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

ExtrasList.propTypes = {
  extras: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      category: PropTypes.string,
      rating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      description: PropTypes.string,
      distance: PropTypes.string
    })
  )
};

export default ExtrasList;