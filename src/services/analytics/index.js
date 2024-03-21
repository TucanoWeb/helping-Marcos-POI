const collection = require("../../models/collection")

const collCategory = collection("category")
const collPoint = collection("points")

class AnalyticsData {


    async findAllCat(){
        const res = await collCategory.find({}).toArray()
        if(res) return res.result.categories
        return false
    }

    async findAllPoints(){
        const res = await collPoint.find({}).toArray()
        if(res) return res.result.points
        return false
    }

    async qtyByCategory(){

        const analytics = {}
        
        const categories = await this.findAllCat()
        const points = await this.findAllPoints()

        points.forEach((element, key) => {

            if(key > categories.length){
                key = categories.length
            }

            if(element.category_id === categories[key -1]["_id"]){
                
                let qnty = 0

                analytics = {
                    ...analytics,
                    [categories[key]["name"]]: qnty++
                }
            }
        })
        
        return analytics
    }

}

module.exports = AnalyticsData