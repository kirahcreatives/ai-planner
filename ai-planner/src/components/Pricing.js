import { useAuth } from '../contexts/AuthContext';

const PricingCard = ({ plan, isPopular }) => {
    return (
        <div className={`relative p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg ${isPopular ? 'ring-2 ring-blue-500' : ''}`}>
            {isPopular && (
                <span className="absolute top-0 -translate-y-1/2 bg-blue-500 text-white px-3 py-1 text-sm font-medium rounded-full">
                    Most Popular
                </span>
            )}
            <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{plan.name}</h3>
                <p className="mt-2 text-gray-500 dark:text-gray-400">{plan.description}</p>
                <p className="mt-8">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">${plan.price}</span>
                    {plan.price > 0 && <span className="text-gray-500 dark:text-gray-400">/mo</span>}
                </p>
            </div>
            <ul className="mt-8 space-y-4">
                {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="ml-3 text-gray-600 dark:text-gray-300">{feature}</span>
                    </li>
                ))}
            </ul>
            <button
                className={`mt-8 w-full py-3 px-4 rounded-lg font-medium transition-colors duration-200 ${isPopular
                    ? 'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600'
                    }`}
            >
                Get Started
            </button>
        </div>
    );
};

const Pricing = () => {
    const { user } = useAuth();
    
    // Don't render anything if user is logged in
    if (user) return null;

    const plans = [
        {
            name: 'Basic',
            description: 'Perfect for occasional travelers',
            price: 0,
            features: [
                'Create basic itineraries',
                'Access to essential features',
                'Community support',
                'Basic recommendations',
                'Share itineraries'
            ]
        },
        {
            name: 'Pro',
            description: 'For frequent travelers',
            price: 9.99,
            features: [
                'Everything in Basic',
                'Real-time updates',
                'Offline access',
                'Priority support',
                'Advanced AI recommendations',
                'Collaborative editing',
                'Custom templates'
            ]
        },
        {
            name: 'Business',
            description: 'For travel agencies',
            price: 29.99,
            features: [
                'Everything in Pro',
                'Multiple users',
                'API access',
                'White-label options',
                'Analytics dashboard',
                'Dedicated support',
                'Custom integrations'
            ]
        }
    ];

    return (
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Simple, Transparent Pricing
                    </h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                        Choose the plan that best fits your needs.
                    </p>
                </div>
                <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    <PricingCard plan={plans[0]} isPopular={false} />
                    <PricingCard plan={plans[1]} isPopular={true} />
                    <PricingCard plan={plans[2]} isPopular={false} />
                </div>
            </div>
        </section>
    );
};

export default Pricing;