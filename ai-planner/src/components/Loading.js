import { useState, useEffect } from 'react';

const Loading = () => {
    const [dots, setDots] = useState('');
    const [message, setMessage] = useState('Analyzing your preferences');

    useEffect(() => {
        const dotsInterval = setInterval(() => {
            setDots(prev => prev.length >= 3 ? '' : prev + '.');
        }, 500);

        const messages = [
            'Analyzing your preferences',
            'Finding the best attractions',
            'Optimizing your schedule',
            'Creating your perfect itinerary',
            'Adding final touches'
        ];

        const messageInterval = setInterval(() => {
            setMessage(prev => {
                const currentIndex = messages.indexOf(prev);
                return messages[(currentIndex + 1) % messages.length];
            });
        }, 3000);

        return () => {
            clearInterval(dotsInterval);
            clearInterval(messageInterval);
        };
    }, []);

    return (
        <div className="flex flex-col items-center justify-center p-12">
            <div className="relative mb-8">
                <div className="w-16 h-16 rounded-full border-t-3 border-b-3 border-blue-500 animate-spin"></div>
                <div className="w-16 h-16 rounded-full border-t-3 border-b-3 border-indigo-500 animate-spin absolute top-0 left-0"
                    style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full animate-pulse"></div>
                </div>
            </div>
            <div className="text-center">
                <div className="text-xl font-semibold text-gray-700 mb-2">
                    {message}{dots}
                </div>
                <div className="text-sm text-gray-500">
                    This may take a few moments
                </div>
            </div>
        </div>
    );
};

export default Loading;