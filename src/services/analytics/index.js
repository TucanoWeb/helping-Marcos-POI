const collection = require("../../models/collection")

const collCategory = collection("category")
const collPoint = collection("points")

class AnalyticsData {


    async findAllCat() {
        const res = await collCategory.find({}).toArray()
        let data = []

        res.map(element => data.push({
            id: element._id.toString(),
            name: element.name
        }))

        if (res) return data
        return false
    }

    async findAllPoints() {
        const res = await collPoint.find({}).toArray()
        let data = []

        res.map(element => data.push({
            id: element._id.toString(),
            name: element.name,
            category_id: element.category_id,
            description: element.description
        }))

        if (res) return data
        return false
    }

    async qtyByCategory() {

        const categories = await this.findAllCat()
        const points = await this.findAllPoints()
        
        let analytics = {
            total: points.length
        }

        
        categories.forEach((category) => {
            
            let qnty = 0
            
            points.forEach((point) => {

                if (category.id === point.category_id) {

                    qnty++

                    analytics = {
                        ...analytics,
                        [category.name]: qnty
                    }
                }
            })
        })

        return analytics
    }

}

module.exports = AnalyticsData