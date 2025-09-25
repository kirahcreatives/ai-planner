import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const ErrorMessage = ({ title, message, actionText, onAction }) => {
    const navigate = useNavigate();

    const handleAction = () => {
        if (onAction) {
            onAction();
        } else {
            navigate('/');
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-8 border border-red-100 max-w-2xl mx-auto mt-8">
            <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                    <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                    </svg>
                </div>
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {title || 'Something went wrong'}
                    </h3>
                    <div className="text-red-600 mb-4">
                        {message || 'An error occurred. Please try again.'}
                    </div>
                    <button
                        onClick={handleAction}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-base 
              font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
              transition-all duration-200 transform hover:scale-[1.02]"
                    >
                        {actionText || 'Try Again'}
                    </button>
                </div>
            </div>
        </div>
    );
};

ErrorMessage.propTypes = {
    title: PropTypes.string,
    message: PropTypes.string,
    actionText: PropTypes.string,
    onAction: PropTypes.func
};

export default ErrorMessage;