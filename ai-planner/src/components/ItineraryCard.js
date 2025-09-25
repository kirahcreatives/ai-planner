import PropTypes from 'prop-types';
import { Tooltip } from './Help';
import { componentHelp } from '../utils/helpContent';

const ItineraryCard = ({ date, items }) => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6 transform transition-all duration-300 hover:shadow-xl">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                    {new Date(date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric'
                    })}
                </h2>
                <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {items.length} Activities
                </span>
            </div>
            <div className="space-y-4">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-start p-4 bg-gray-50 rounded-lg border border-gray-100
              transform transition-all duration-200 hover:scale-[1.01] hover:bg-blue-50"
                    >
                        <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
                            <div className="flex items-center space-x-4">
                                <Tooltip content={componentHelp.itineraryCard.category}>
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                    bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 cursor-help">
                                        {item.category}
                                    </span>
                                </Tooltip>
                                <Tooltip content={componentHelp.itineraryCard.duration}>
                                    <span className="flex items-center text-sm text-gray-600 dark:text-gray-300 cursor-help">
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {Math.floor(item.duration_mins / 60)}h {item.duration_mins % 60}m
                                    </span>
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

ItineraryCard.propTypes = {
    date: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            category: PropTypes.string.isRequired,
            duration_mins: PropTypes.number.isRequired,
        })
    ).isRequired,
};

export default ItineraryCard;