import React from 'react';
import { Helmet } from 'react-helmet-async';
import Breadcrumbs from '../components/Breadcrumbs';

const Terms = () => {
    return (
        <>
            <Helmet>
                <title>Terms of Service - AI Travel Planner</title>
                <meta name="description" content="Read our terms of service to understand your rights and responsibilities when using AI Travel Planner." />
            </Helmet>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <Breadcrumbs
                    items={[
                        { label: 'Home', path: '/' },
                        { label: 'Terms of Service', path: '/terms' }
                    ]}
                />

                <div className="prose dark:prose-invert max-w-none">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Terms of Service</h1>

                    <section className="mb-12">
                        <p className="text-gray-600 dark:text-gray-300">
                            Last updated: September 25, 2025
                        </p>

                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mt-8 mb-4">
                            1. Acceptance of Terms
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            By accessing or using AI Travel Planner, you agree to be bound by these Terms of Service.
                            If you disagree with any part of the terms, you may not access the service.
                        </p>

                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mt-8 mb-4">
                            2. Use License
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            We grant you a limited, non-exclusive, non-transferable, and revocable license to use our service
                            for your personal, non-commercial use, subject to these Terms.
                        </p>

                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mt-8 mb-4">
                            3. User Accounts
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            You are responsible for:
                        </p>
                        <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300">
                            <li>Maintaining the confidentiality of your account</li>
                            <li>All activities that occur under your account</li>
                            <li>Notifying us of any unauthorized use</li>
                        </ul>

                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mt-8 mb-4">
                            4. Service Modifications
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            We reserve the right to:
                        </p>
                        <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300">
                            <li>Modify or discontinue any part of our service</li>
                            <li>Change service fees with notice</li>
                            <li>Limit features or functionality to certain users</li>
                        </ul>

                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mt-8 mb-4">
                            5. User Content
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            You retain all rights to content you submit, but grant us a license to use,
                            modify, and display that content in connection with our service.
                        </p>

                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mt-8 mb-4">
                            6. Prohibited Activities
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            You agree not to:
                        </p>
                        <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300">
                            <li>Use the service for any illegal purpose</li>
                            <li>Harass, abuse, or harm others</li>
                            <li>Interfere with the proper operation of the service</li>
                            <li>Attempt to gain unauthorized access</li>
                        </ul>

                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mt-8 mb-4">
                            7. Disclaimer of Warranties
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            The service is provided "as is" without warranties of any kind, whether express or implied.
                        </p>

                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mt-8 mb-4">
                            8. Limitation of Liability
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            We shall not be liable for any indirect, incidental, special, consequential, or punitive damages.
                        </p>

                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mt-8 mb-4">
                            9. Contact Information
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            For any questions about these Terms, please contact us at:
                        </p>
                        <ul className="list-none pl-6 text-gray-600 dark:text-gray-300">
                            <li>Email: legal@aitravelplanner.com</li>
                            <li>Address: 123 Travel Street, Suite 100, San Francisco, CA 94105</li>
                        </ul>
                    </section>
                </div>
            </div>
        </>
    );
};

export default Terms;