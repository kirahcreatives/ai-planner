class OpenAIError extends Error {
    constructor(message, statusCode = 500, originalError = null) {
        super(message);
        this.name = 'OpenAIError';
        this.statusCode = statusCode;
        this.originalError = originalError;
    }
}

const handleOpenAIError = (error) => {
    if (error.name === 'OpenAIError') {
        return error;
    }

    // Handle specific OpenAI API errors
    switch (error.code) {
        case 'invalid_api_key':
            return new OpenAIError('Invalid API key', 401, error);
        case 'model_not_found':
            return new OpenAIError('AI model not available', 400, error);
        case 'rate_limit_exceeded':
        case 'insufficient_quota':
            return new OpenAIError('OpenAI API quota exceeded. Please try again later or contact support.', 429, error);
        default:
            return new OpenAIError(
                error.message || 'An error occurred while processing your request',
                error.status || 500,
                error
            );
    }
};

module.exports = {
    OpenAIError,
    handleOpenAIError
};