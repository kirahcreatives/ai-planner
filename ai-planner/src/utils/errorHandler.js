export const handleApiError = (error) => {
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        const data = error.response.data;

        switch (error.response.status) {
            case 400:
                if (data.errors && Array.isArray(data.errors)) {
                    // Handle validation errors
                    return data.errors.map(err => err.msg).join(', ');
                }
                return data.message || 'Invalid request';

            case 401:
                return 'Please login to continue';

            case 403:
                return 'You do not have permission to perform this action';

            case 404:
                return 'The requested resource was not found';

            case 429:
                return 'Too many requests. Please try again later';

            case 500:
                return 'An unexpected error occurred. Please try again later';

            default:
                return data.message || 'Something went wrong';
        }
    } else if (error.request) {
        // The request was made but no response was received
        return 'Unable to connect to the server. Please check your internet connection';
    } else {
        // Something happened in setting up the request
        return 'An error occurred while processing your request';
    }
};