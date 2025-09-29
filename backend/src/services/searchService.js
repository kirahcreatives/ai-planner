const Itinerary = require('../models/Itinerary');

class SearchService {
    static async searchItineraries({
        userId,
        searchQuery,
        filters,
        sort,
        page = 1,
        limit = 10
    }) {
        try {
            // Build base query with user filter
            let query = { userId };

            // Add text search if provided
            if (searchQuery) {
                query.$text = { $search: searchQuery };
            }

            // Add filters
            if (filters) {
                // Date range filter
                if (filters.dateRange) {
                    const { start, end } = filters.dateRange;
                    if (start) query.startDate = { $gte: new Date(start) };
                    if (end) query.endDate = { $lte: new Date(end) };
                }

                // Interests filter
                if (filters.interests && filters.interests.length > 0) {
                    query.interests = { $in: filters.interests };
                }

                // Budget range filter
                if (filters.budget) {
                    const { min, max } = filters.budget;
                    if (min !== undefined) query.budget = { $gte: min };
                    if (max !== undefined) query.budget = { ...query.budget, $lte: max };
                }

                // Pace filter
                if (filters.pace) {
                    query.pace = filters.pace;
                }

                // Activity category filter
                if (filters.category) {
                    query['activities.category'] = filters.category;
                }
            }

            // Build sort options
            let sortOptions = {};
            if (sort) {
                switch (sort) {
                    case 'dateAsc':
                        sortOptions.startDate = 1;
                        break;
                    case 'dateDesc':
                        sortOptions.startDate = -1;
                        break;
                    case 'budgetAsc':
                        sortOptions.budget = 1;
                        break;
                    case 'budgetDesc':
                        sortOptions.budget = -1;
                        break;
                    default:
                        sortOptions.createdAt = -1;
                }
            } else {
                sortOptions.createdAt = -1; // Default sort by newest
            }

            // Execute query with pagination
            const skip = (page - 1) * limit;
            const [results, total] = await Promise.all([
                Itinerary.find(query)
                    .sort(sortOptions)
                    .skip(skip)
                    .limit(limit)
                    .lean(),
                Itinerary.countDocuments(query)
            ]);

            // Calculate pagination info
            const totalPages = Math.ceil(total / limit);
            const hasNext = page < totalPages;
            const hasPrev = page > 1;

            return {
                results,
                pagination: {
                    page,
                    limit,
                    total,
                    totalPages,
                    hasNext,
                    hasPrev
                }
            };
        } catch (error) {
            console.error('Search error:', error);
            throw new Error('Error searching itineraries');
        }
    }

    static async getStats(userId) {
        try {
            return await Itinerary.aggregate([
                { $match: { userId: userId } },
                {
                    $facet: {
                        totalItineraries: [{ $count: 'count' }],
                        byDestination: [
                            { $group: { _id: '$destination', count: { $sum: 1 } } },
                            { $sort: { count: -1 } },
                            { $limit: 5 }
                        ],
                        byInterest: [
                            { $unwind: '$interests' },
                            { $group: { _id: '$interests', count: { $sum: 1 } } },
                            { $sort: { count: -1 } },
                            { $limit: 5 }
                        ],
                        byMonth: [
                            {
                                $group: {
                                    _id: { $month: '$startDate' },
                                    count: { $sum: 1 }
                                }
                            },
                            { $sort: { _id: 1 } }
                        ]
                    }
                }
            ]);
        } catch (error) {
            console.error('Stats error:', error);
            throw new Error('Error getting itinerary statistics');
        }
    }
}

module.exports = SearchService;