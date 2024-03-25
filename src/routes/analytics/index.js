const AnalyticsData = require("../../services/analytics/index.js")

const client = new AnalyticsData()

const analyticsRoute = [
    {
        method: "GET",
        path: "/analytics",
        handler: async (request, h) => {

            const result = await client.qtyByCategory()
            return {
                error: false,
                message: "Success",
                result
            }
        }
    }
]

module.exports = analyticsRoute
