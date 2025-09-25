import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = () => {
    const location = useLocation();
    const pathSegments = location.pathname.split('/').filter(segment => segment);

    const breadcrumbMap = {
        'create': 'Create Plan',
        'results': 'Your Itinerary',
        'profile': 'Profile',
        'settings': 'Settings'
    };

    return (
        <nav aria-label="Breadcrumb" className="py-2 px-4 sm:px-6 lg:px-8">
            <ol className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                <li>
                    <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        Home
                    </Link>
                </li>
                {pathSegments.map((segment, index) => (
                    <li key={segment} className="flex items-center">
                        <svg className="w-4 h-4 mx-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        {index === pathSegments.length - 1 ? (
                            <span className="font-medium text-gray-900 dark:text-white" aria-current="page">
                                {breadcrumbMap[segment] || segment}
                            </span>
                        ) : (
                            <Link
                                to={`/${pathSegments.slice(0, index + 1).join('/')}`}
                                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            >
                                {breadcrumbMap[segment] || segment}
                            </Link>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Breadcrumbs;