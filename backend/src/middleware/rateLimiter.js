const rateLimit = require('express-rate-limit');

const createRateLimiter = (options = {}) => {
  return rateLimit({
    windowMs: options.windowMs || 15 * 60 * 1000, // 15 minutes by default
    max: options.max || 100, // Limit each IP to 100 requests per windowMs
    message: options.message || 'Too many requests from this IP, please try again later',
    standardHeaders: true,
    legacyHeaders: false
  });
};

// Specific limiters for different routes
const authLimiter = createRateLimiter({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // 5 attempts per hour for login/register
  message: 'Too many authentication attempts, please try again after an hour'
});

const apiLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // 100 requests per 15 minutes
});

const generateItineraryLimiter = createRateLimiter({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // 10 generations per hour
  message: 'Generation limit reached, please try again later'
});

module.exports = {
  authLimiter,
  apiLimiter,
  generateItineraryLimiter
};