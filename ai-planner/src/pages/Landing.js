import { Link } from 'react-router-dom';
import FAQ from '../components/FAQ';
import Pricing from '../components/Pricing';

const Landing = () => {

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-700 dark:from-blue-800 dark:to-indigo-900" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
                            Plan Your Perfect Trip with AI
                            <span className="block text-blue-200 mt-2">Personalized Itineraries in Minutes</span>
                        </h1>
                        <p className="mt-6 max-w-lg mx-auto text-xl text-blue-100">
                            Let artificial intelligence create a custom travel itinerary based on your preferences, budget, and schedule.
                        </p>
                        <div className="mt-10 flex justify-center gap-4">
                            <Link
                                to="/create"
                                className="px-8 py-3 text-lg font-medium rounded-lg bg-white text-blue-600 hover:bg-blue-50 
                  dark:bg-blue-900 dark:text-white dark:hover:bg-blue-800 transition-colors duration-200"
                            >
                                Plan Your Trip
                            </Link>
                            <Link
                                to="/how-it-works"
                                className="px-8 py-3 text-lg font-medium rounded-lg border-2 border-white text-white 
                  hover:bg-white hover:text-blue-600 dark:hover:bg-blue-900 transition-colors duration-200"
                            >
                                Learn More
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                            Why Choose AI Planner?
                        </h2>
                        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                            Experience the future of travel planning with our cutting-edge features.
                        </p>
                    </div>
                    <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {features.map((feature) => (
                            <div key={feature.title} className="relative p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                                <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-20 bg-gray-50 dark:bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                            How It Works
                        </h2>
                        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                            Create your perfect itinerary in three simple steps.
                        </p>
                    </div>
                    <div className="mt-16 grid gap-8 md:grid-cols-3">
                        {steps.map((step, index) => (
                            <div key={step.title} className="text-center">
                                <div className="relative">
                                    <div className="w-16 h-16 rounded-full bg-blue-600 dark:bg-blue-800 text-white text-2xl font-bold flex items-center justify-center mx-auto">
                                        {index + 1}
                                    </div>
                                    {index < steps.length - 1 && (
                                        <div className="hidden md:block absolute top-8 left-1/2 w-full border-t-2 border-gray-300 dark:border-gray-600" />
                                    )}
                                </div>
                                <h3 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">
                                    {step.title}
                                </h3>
                                <p className="mt-2 text-gray-600 dark:text-gray-300">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-20 bg-white dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                            What Our Users Say
                        </h2>
                        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                            Discover how AI Planner has transformed travel planning for thousands of users.
                        </p>
                    </div>
                    <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {testimonials.map((testimonial) => (
                            <div key={testimonial.name} className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                <div className="flex items-center mb-4">
                                    <img
                                        src={testimonial.avatar}
                                        alt={testimonial.name}
                                        className="w-12 h-12 rounded-full"
                                    />
                                    <div className="ml-4">
                                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                                            {testimonial.name}
                                        </h4>
                                        <p className="text-gray-600 dark:text-gray-400">{testimonial.location}</p>
                                    </div>
                                </div>
                                <p className="text-gray-600 dark:text-gray-300">{testimonial.content}</p>
                                <div className="mt-4 flex text-yellow-400">
                                    {[...Array(5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            className={`w-5 h-5 ${i < testimonial.rating ? 'fill-current' : 'stroke-current fill-none'}`}
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-700 dark:from-blue-800 dark:to-indigo-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-white">
                        Ready to Plan Your Next Adventure?
                    </h2>
                    <p className="mt-4 text-xl text-blue-100">
                        Join thousands of happy travelers who have discovered the power of AI-powered trip planning.
                    </p>
                    <Link
                        to="/create"
                        className="mt-8 inline-block px-8 py-3 text-lg font-medium rounded-lg bg-white text-blue-600 
              hover:bg-blue-50 dark:bg-blue-900 dark:text-white dark:hover:bg-blue-800 transition-colors duration-200"
                    >
                        Get Started for Free
                    </Link>
                </div>
            </section>

            {/* Pricing Section */}
            <Pricing />

            {/* FAQ Section */}
            <FAQ />

            {/* Newsletter Section */}
            <section className="py-16 bg-gray-50 dark:bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-xl mx-auto text-center">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Stay Updated
                        </h2>
                        <p className="mt-4 text-gray-600 dark:text-gray-300">
                            Subscribe to our newsletter for travel tips and exclusive offers.
                        </p>
                        <form className="mt-8 sm:flex justify-center">
                            <input
                                type="email"
                                className="w-full sm:max-w-xs px-4 py-3 text-base rounded-lg border border-gray-300 
                  dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
                  placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 
                  dark:focus:ring-blue-400 focus:border-transparent"
                                placeholder="Enter your email"
                            />
                            <button
                                type="submit"
                                className="mt-3 sm:mt-0 sm:ml-3 w-full sm:w-auto px-6 py-3 text-base font-medium rounded-lg
                  bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 
                  dark:focus:ring-offset-gray-800"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

// Static data
const features = [
    {
        title: 'AI-Powered Planning',
        description: 'Leverage advanced AI to create personalized itineraries based on your preferences and travel style.',
        icon: (
            <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
        )
    },
    {
        title: 'Smart Recommendations',
        description: 'Get intelligent suggestions for attractions, restaurants, and activities based on real traveler data.',
        icon: (
            <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
        )
    },
    {
        title: 'Real-Time Updates',
        description: 'Stay informed with live updates on weather, events, and local recommendations during your trip.',
        icon: (
            <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        )
    }
];

const steps = [
    {
        title: 'Enter Your Preferences',
        description: 'Tell us about your travel style, budget, and interests.'
    },
    {
        title: 'Get Your Itinerary',
        description: 'Our AI creates a personalized day-by-day plan just for you.'
    },
    {
        title: 'Customize & Go',
        description: 'Fine-tune your plan and start your adventure with confidence.'
    }
];

const testimonials = [
    {
        name: 'Sarah Johnson',
        location: 'New York, USA',
        content: 'AI Planner made planning my Europe trip so much easier. The recommendations were spot-on!',
        rating: 5,
        avatar: 'https://randomuser.me/api/portraits/women/1.jpg'
    },
    {
        name: 'Michael Chen',
        location: 'Toronto, Canada',
        content: 'Incredible tool that saved me hours of research. The itinerary was perfect for my style.',
        rating: 5,
        avatar: 'https://randomuser.me/api/portraits/men/2.jpg'
    },
    {
        name: 'Emma Thompson',
        location: 'London, UK',
        content: 'The best travel planning tool I\'ve ever used. It understood exactly what I was looking for.',
        rating: 5,
        avatar: 'https://randomuser.me/api/portraits/women/3.jpg'
    }
];

export default Landing;