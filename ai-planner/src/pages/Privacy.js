import React from 'react';
import { Helmet } from 'react-helmet-async';
import Breadcrumbs from '../components/Breadcrumbs';

const Privacy = () => {
    return (
        <>
            <Helmet>
                <title>Privacy Policy - AI Travel Planner</title>
                <meta name="description" content="Learn about how AI Travel Planner protects and handles your personal information." />
            </Helmet>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <Breadcrumbs
                    items={[
                        { label: 'Home', path: '/' },
                        { label: 'Privacy Policy', path: '/privacy' }
                    ]}
                />

                <div className="prose dark:prose-invert max-w-none">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Privacy Policy</h1>

                    <section className="mb-12">
                        <p className="text-gray-600 dark:text-gray-300">
                            Last updated: September 25, 2025
                        </p>

                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mt-8 mb-4">
                            1. Information We Collect
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            We collect information that you provide directly to us, including:
                        </p>
                        <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300">
                            <li>Name and contact information</li>
                            <li>Travel preferences and history</li>
                            <li>Account credentials</li>
                            <li>Payment information</li>
                            <li>Communication history</li>
                        </ul>

                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mt-8 mb-4">
                            2. How We Use Your Information
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            We use the information we collect to:
                        </p>
                        <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300">
                            <li>Provide and improve our services</li>
                            <li>Personalize your experience</li>
                            <li>Process your transactions</li>
                            <li>Communicate with you</li>
                            <li>Ensure platform security</li>
                        </ul>

                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mt-8 mb-4">
                            3. Information Sharing
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            We do not sell your personal information. We may share your information with:
                        </p>
                        <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300">
                            <li>Service providers and partners</li>
                            <li>Legal authorities when required</li>
                            <li>Other users with your consent</li>
                        </ul>

                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mt-8 mb-4">
                            4. Data Security
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            We implement appropriate technical and organizational measures to protect your personal information.
                            This includes encryption, secure servers, and regular security audits.
                        </p>

                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mt-8 mb-4">
                            5. Your Rights
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            You have the right to:
                        </p>
                        <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300">
                            <li>Access your personal information</li>
                            <li>Correct inaccurate data</li>
                            <li>Request deletion of your data</li>
                            <li>Opt-out of marketing communications</li>
                            <li>Export your data</li>
                        </ul>

                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mt-8 mb-4">
                            6. Contact Us
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            If you have any questions about this Privacy Policy, please contact us at:
                        </p>
                        <ul className="list-none pl-6 text-gray-600 dark:text-gray-300">
                            <li>Email: privacy@aitravelplanner.com</li>
                            <li>Address: 123 Travel Street, Suite 100, San Francisco, CA 94105</li>
                            <li>Phone: (555) 123-4567</li>
                        </ul>
                    </section>
                </div>
            </div>
        </>
    );
};

export default Privacy;