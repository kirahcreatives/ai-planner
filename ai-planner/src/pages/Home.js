import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useItinerary } from '../context/ItineraryContext';
import { pageHelpContent } from '../utils/helpContent';
import ErrorMessage from '../components/ErrorMessage';

const Home = () => {
  const navigate = useNavigate();
  const { setLoading, setItinerary, setError, formData, updateFormData } = useItinerary();
  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);

    if (!formData.destination) errors.destination = 'Destination is required';
    if (!formData.startDate) errors.startDate = 'Start date is required';
    if (!formData.endDate) errors.endDate = 'End date is required';
    if (end < start) errors.endDate = 'End date must be after start date';
    if (!formData.interests) errors.interests = 'Interests are required';
    if (!formData.dailyHours) errors.dailyHours = 'Daily hours is required';
    if (formData.dailyHours <= 0) errors.dailyHours = 'Daily hours must be greater than 0';
    if (!formData.budget) errors.budget = 'Budget is required';
    if (parseFloat(formData.budget) <= 0) errors.budget = 'Budget must be greater than 0';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          destination: formData.destination,
          budget: {
            amount: parseFloat(formData.budget),
            currency: formData.budgetCurrency
          },
          start_date: formData.startDate,
          end_date: formData.endDate,
          interests: formData.interests.split(',').map(i => i.trim()),
          daily_hours: parseFloat(formData.dailyHours),
          pace: formData.pace,
        }),
      });

      if (!response.ok) throw new Error('Failed to generate itinerary');

      const data = await response.json();
      setItinerary(data.itinerary);
      navigate('/results');
    } catch (error) {
      setError(error.message);
      setFormErrors({
        submit: 'Failed to generate itinerary. Please try again.'
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-8 sm:mb-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">{pageHelpContent.home.title}</h1>
        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
          {pageHelpContent.home.description}
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-4">
          {pageHelpContent.home.tips.map((tip, index) => (
            <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm
              bg-blue-50 text-blue-600 dark:bg-blue-900 dark:text-blue-200">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {tip}
            </span>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white shadow-2xl rounded-2xl p-4 sm:p-8 transition-all duration-300 hover:shadow-3xl">
        <div className="space-y-6 sm:space-y-8">
          <div className="transform transition-all duration-200 hover:scale-[1.02]">
            <label htmlFor="destination" className="block text-sm font-semibold text-gray-700 mb-2">
              Destination
            </label>
            <input
              type="text"
              id="destination"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${formErrors.destination ? 'border-red-500' : 'border-gray-300'
                }`}
              placeholder="e.g., Paris, France"
            />
            {formErrors.destination && (
              <p className="mt-1 text-sm text-red-500">{formErrors.destination}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="transform transition-all duration-200 hover:scale-[1.02]">
              <label htmlFor="startDate" className="block text-sm font-semibold text-gray-700 mb-2">
                Start Date
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-lg border-2 shadow-sm 
                  transition-all duration-200
                  ${formErrors.startDate
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                    : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500'
                  }
                  hover:border-blue-300`}
              />
              {formErrors.startDate && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" />
                  </svg>
                  {formErrors.startDate}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                End Date
              </label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${formErrors.endDate ? 'border-red-500' : ''
                  }`}
              />
              {formErrors.endDate && (
                <p className="mt-1 text-sm text-red-600">{formErrors.endDate}</p>
              )}
            </div>

            <div>
              <label htmlFor="interests" className="block text-sm font-medium text-gray-700">
                Interests (comma separated)
              </label>
              <input
                type="text"
                id="interests"
                name="interests"
                value={formData.interests}
                onChange={handleChange}
                placeholder="art, history, food"
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${formErrors.interests ? 'border-red-500' : ''
                  }`}
              />
              {formErrors.interests && (
                <p className="mt-1 text-sm text-red-600">{formErrors.interests}</p>
              )}
            </div>

            <div>
              <label htmlFor="dailyHours" className="block text-sm font-medium text-gray-700">
                Daily Hours
              </label>
              <input
                type="number"
                id="dailyHours"
                name="dailyHours"
                value={formData.dailyHours}
                onChange={handleChange}
                min="1"
                max="24"
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${formErrors.dailyHours ? 'border-red-500' : ''
                  }`}
              />
              {formErrors.dailyHours && (
                <p className="mt-1 text-sm text-red-600">{formErrors.dailyHours}</p>
              )}
            </div>

            <div>
              <label htmlFor="pace" className="block text-sm font-medium text-gray-700">
                Pace
              </label>
              <select
                id="pace"
                name="pace"
                value={formData.pace}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="relaxed">Relaxed</option>
                <option value="moderate">Moderate</option>
                <option value="intense">Intense</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 col-span-2">
              <div>
                <label htmlFor="budget" className="block text-sm font-medium text-gray-700">
                  Budget
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">
                      {formData.budgetCurrency === 'USD' ? '$' : '€'}
                    </span>
                  </div>
                  <input
                    type="number"
                    name="budget"
                    id="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className={`block w-full pl-7 pr-12 rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500 ${formErrors.budget ? 'border-red-500' : ''
                      }`}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                  />
                  {formErrors.budget && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.budget}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="budgetCurrency" className="block text-sm font-medium text-gray-700">
                  Currency
                </label>
                <select
                  id="budgetCurrency"
                  name="budgetCurrency"
                  value={formData.budgetCurrency}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                </select>
              </div>
            </div>

            {formErrors.submit && (
              <div className="col-span-2 mb-4">
                <ErrorMessage
                  title="Submission Error"
                  message={formErrors.submit}
                  actionText="Dismiss"
                  onAction={() => setFormErrors(prev => ({ ...prev, submit: null }))}
                />
              </div>
            )}

            <div className="col-span-2 mt-6">
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 hover:scale-[1.02]"
              >
                Generate Itinerary
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Home;