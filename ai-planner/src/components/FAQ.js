import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-gray-200 dark:border-gray-700">
            <button
                className="w-full py-4 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex items-center justify-between">
                    <span className="text-lg font-medium text-gray-900 dark:text-white">{question}</span>
                    <svg
                        className={`w-6 h-6 text-gray-500 dark:text-gray-400 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''
                            }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </button>
            <div
                className={`overflow-hidden transition-all duration-200 ${isOpen ? 'max-h-96 py-4' : 'max-h-0'
                    }`}
            >
                <p className="text-gray-600 dark:text-gray-300">{answer}</p>
            </div>
        </div>
    );
};

const FAQ = () => {
    const { user } = useAuth();
    
    // Don't render anything if user is logged in
    if (user) return null;

    const faqs = [
        {
            question: 'How does AI Planner create my itinerary?',
            answer: 'Our AI analyzes thousands of data points including your preferences, travel style, budget, and real traveler experiences to create a personalized itinerary just for you. It considers factors like opening hours, travel time, and local recommendations to optimize your schedule.'
        },
        {
            question: 'Can I modify the generated itinerary?',
            answer: 'Yes! While our AI creates a great starting point, you have full control to customize your itinerary. You can add, remove, or reorder activities, adjust timings, and make any other changes to ensure the plan perfectly matches your preferences.'
        },
        {
            question: 'Is AI Planner free to use?',
            answer: 'We offer both free and premium plans. With our free plan, you can create basic itineraries and access essential features. Our premium plans include additional features like real-time updates, offline access, and priority support.'
        },
        {
            question: 'How far in advance should I plan my trip?',
            answer: 'While you can create an itinerary at any time, we recommend planning at least a few weeks ahead to take advantage of better availability and pricing for accommodations and activities. This also gives you time to fine-tune your plan.'
        },
        {
            question: 'Can I share my itinerary with others?',
            answer: 'Yes! You can easily share your itinerary with travel companions via email or a unique link. They can view the full plan and even collaborate on making changes if you grant them permission.'
        }
    ];

    return (
        <section className="py-20 bg-white dark:bg-gray-900">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Frequently Asked Questions
                    </h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                        Have questions? We have answers.
                    </p>
                </div>
                <div className="mt-12 space-y-2">
                    {faqs.map((faq) => (
                        <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;