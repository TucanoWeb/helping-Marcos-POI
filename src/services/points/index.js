const collection = require("../../models/collection")
const {ObjectId} = require("mongodb")

const collectionClient = collection("points")

class PointsMongo {

    async findAll(){
        const res = await collectionClient.find({}).toArray()
        if(res) return res
        return false
    }

    async findOne(name){
        const res = await collectionClient.findOne({name: name})
        if(res) return res
        return false
    }

    async createOne(data){
        try{
            await collectionClient.insertOne(data)
            return true
        } catch(e){
            console.log(e)
            return e
        }
    }
    

    async update(name, data){
        try {
            await collectionClient.updateOne({name: name}, {$set: data})
            return true
        } catch (e){
            console.log(e)
            return false
        }
    }

    async delete(id){
        try{
            const objectId = new ObjectId(id)
            await collectionClient.deleteOne({_id: objectId})
            return true
        } catch(e){
            console.log(e)
            return false
        }
    }
}

module.exports = PointsMongo