import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Breadcrumbs from '../components/Breadcrumbs';
import { componentHelp, pageHelpContent } from '../utils/helpContent';

const HelpCenter = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('getting-started');

    const categories = {
        'getting-started': {
            title: 'Getting Started',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            ),
            topics: [
                { title: 'Welcome to AI Travel Planner', content: pageHelpContent.welcome },
                { title: 'Creating Your First Itinerary', content: pageHelpContent.createItinerary },
                { title: 'Understanding AI Recommendations', content: pageHelpContent.aiRecommendations }
            ]
        },
        'planning': {
            title: 'Travel Planning',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
            ),
            topics: [
                { title: 'Customizing Your Trip', content: componentHelp.itinerary.customize },
                { title: 'Managing Destinations', content: componentHelp.itinerary.destinations },
                { title: 'Budget Planning', content: componentHelp.itinerary.budget }
            ]
        },
        'account': {
            title: 'Account & Settings',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            ),
            topics: [
                { title: 'Managing Your Profile', content: componentHelp.account.profile },
                { title: 'Privacy Settings', content: componentHelp.account.privacy },
                { title: 'Notification Preferences', content: componentHelp.account.notifications }
            ]
        },
        'troubleshooting': {
            title: 'Troubleshooting',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
            ),
            topics: [
                { title: 'Common Issues', content: pageHelpContent.commonIssues },
                { title: 'Contact Support', content: pageHelpContent.support },
                { title: 'FAQs', content: pageHelpContent.faqs }
            ]
        }
    };

    const filteredTopics = searchQuery
        ? Object.values(categories).flatMap(category =>
            category.topics.filter(topic =>
                topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                topic.content.toLowerCase().includes(searchQuery.toLowerCase())
            )
        )
        : [];

    return (
        <>
            <Helmet>
                <title>Help Center - AI Travel Planner</title>
                <meta name="description" content="Get help with AI Travel Planner. Find answers to common questions and learn how to use our features." />
            </Helmet>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <Breadcrumbs
                    items={[
                        { label: 'Home', path: '/' },
                        { label: 'Help Center', path: '/help' }
                    ]}
                />

                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Help Center</h1>

                    <div className="relative max-w-xl">
                        <input
                            type="search"
                            className="w-full p-4 pl-12 text-sm text-gray-900 bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Search help articles..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <svg
                            className="absolute left-4 top-4 w-5 h-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>

                {searchQuery ? (
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                            Search Results ({filteredTopics.length})
                        </h2>
                        {filteredTopics.map((topic, index) => (
                            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                                    {topic.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">{topic.content}</p>
                            </div>
                        ))}
                        {filteredTopics.length === 0 && (
                            <p className="text-gray-600 dark:text-gray-300">
                                No results found for "{searchQuery}". Try different keywords or browse our help categories below.
                            </p>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {Object.entries(categories).map(([key, category]) => (
                            <button
                                key={key}
                                onClick={() => setActiveCategory(key)}
                                className={`text-left p-6 rounded-lg shadow-sm transition-colors ${activeCategory === key
                                    ? 'bg-blue-50 dark:bg-blue-900 border-2 border-blue-500'
                                    : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'
                                    }`}
                            >
                                <div className="flex items-center mb-4">
                                    <div className={`${activeCategory === key
                                        ? 'text-blue-600 dark:text-blue-400'
                                        : 'text-gray-600 dark:text-gray-400'
                                        }`}>
                                        {category.icon}
                                    </div>
                                    <h2 className="ml-3 text-lg font-medium text-gray-900 dark:text-white">
                                        {category.title}
                                    </h2>
                                </div>
                                <ul className="space-y-2">
                                    {category.topics.map((topic, index) => (
                                        <li
                                            key={index}
                                            className="text-sm text-gray-600 dark:text-gray-300"
                                        >
                                            {topic.title}
                                        </li>
                                    ))}
                                </ul>
                            </button>
                        ))}
                    </div>
                )}

                {!searchQuery && activeCategory && (
                    <div className="mt-12">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                            {categories[activeCategory].title}
                        </h2>
                        <div className="space-y-8">
                            {categories[activeCategory].topics.map((topic, index) => (
                                <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                                        {topic.title}
                                    </h3>
                                    <div className="prose dark:prose-invert max-w-none">
                                        <p className="text-gray-600 dark:text-gray-300">{topic.content}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default HelpCenter;