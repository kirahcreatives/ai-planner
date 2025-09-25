import React from 'react';
import { Helmet } from 'react-helmet-async';
import Breadcrumbs from '../components/Breadcrumbs';

const About = () => {
    return (
        <>
            <Helmet>
                <title>About Us - AI Travel Planner</title>
                <meta name="description" content="Learn about AI Travel Planner and our mission to revolutionize travel planning with artificial intelligence." />
            </Helmet>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <Breadcrumbs
                    items={[
                        { label: 'Home', path: '/' },
                        { label: 'About', path: '/about' }
                    ]}
                />

                <div className="prose dark:prose-invert max-w-none">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">About AI Travel Planner</h1>

                    <section className="mb-12">
                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Our Mission</h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            At AI Travel Planner, we're dedicated to revolutionizing the way people plan their travels.
                            By combining artificial intelligence with human expertise, we create personalized travel
                            experiences that cater to your unique preferences and needs.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">What Sets Us Apart</h2>
                        <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300">
                            <li className="mb-2">Personalized AI-driven recommendations</li>
                            <li className="mb-2">Real-time itinerary optimization</li>
                            <li className="mb-2">Local expertise and insights</li>
                            <li className="mb-2">Sustainable travel options</li>
                            <li>24/7 trip planning assistance</li>
                        </ul>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Our Values</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                <h3 className="text-xl font-semibold mb-3">Innovation</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Continuously improving our AI technology to provide better travel experiences.
                                </p>
                            </div>
                            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                <h3 className="text-xl font-semibold mb-3">Sustainability</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Promoting eco-friendly travel options and responsible tourism.
                                </p>
                            </div>
                            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                <h3 className="text-xl font-semibold mb-3">Accessibility</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Making travel planning accessible and enjoyable for everyone.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Join Us on the Journey</h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            Whether you're planning a weekend getaway or a round-the-world adventure,
                            AI Travel Planner is here to help make your travel dreams a reality.
                            Join thousands of satisfied travelers who have discovered the future of travel planning.
                        </p>
                    </section>
                </div>
            </div>
        </>
    );
};

export default About;