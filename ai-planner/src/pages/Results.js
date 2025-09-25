import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useItinerary } from '../context/ItineraryContext';
import ItineraryCard from '../components/ItineraryCard';
import ExtrasList from '../components/ExtrasList';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

const Results = () => {
    const navigate = useNavigate();
    const { itinerary, error, loading } = useItinerary();

    useEffect(() => {
        if (!itinerary && !error) {
            // Redirect to home if there's no itinerary and no error
            navigate('/');
        }
    }, [itinerary, error, navigate]);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return (
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <ErrorMessage
                    title="Error Generating Itinerary"
                    message={error}
                    actionText="Try Again"
                />
            </div>
        );
    }

    if (!itinerary) return null;

    return (
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-xl p-6 text-white">
                    <h1 className="text-3xl font-bold mb-2">Your Travel Itinerary</h1>
                    <div className="flex flex-wrap gap-4">
                        <div className="bg-white/10 rounded-lg px-4 py-2">
                            <span className="text-sm opacity-80">Destination</span>
                            <p className="font-semibold">{itinerary.destination}</p>
                        </div>
                        <div className="bg-white/10 rounded-lg px-4 py-2">
                            <span className="text-sm opacity-80">Duration</span>
                            <p className="font-semibold">{itinerary.days.length} Days</p>
                        </div>
                        <div className="bg-white/10 rounded-lg px-4 py-2">
                            <span className="text-sm opacity-80">Budget</span>
                            <p className="font-semibold">{itinerary.budget.currency} {itinerary.budget.amount}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-800">Daily Schedule</h2>
                            <div className="flex gap-2">
                                <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                                    Print
                                </button>
                                <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                                    Share
                                </button>
                            </div>
                        </div>
                    </div>

                    {itinerary.days.map((day, index) => (
                        <ItineraryCard key={index} date={day.date} items={day.items} />
                    ))}
                </div>

                <div className="lg:col-span-1">
                    <div className="sticky top-6 space-y-6">
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                            <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-600">
                                <h3 className="text-lg font-semibold text-white">Trip Extras</h3>
                            </div>
                            <ExtrasList extras={itinerary.extras} />
                        </div>

                        <div className="flex gap-4">
                            <button
                                onClick={() => window.print()}
                                className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                                </svg>
                                Print
                            </button>
                            <button
                                onClick={() => navigate('/')}
                                className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                New Plan
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Results;