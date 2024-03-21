const collection = require("../../models/collection")

const collectionClient = collection("users")

class UserMongo {

    auth(response, email, password){
        if(response.email === email && response.password === password) return true
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
    
    
    async login(request){
        
        const email = request.email
        const password = request.password

        const response = await collectionClient.findOne({email: email})

        const user = this.auth(response, email, password)

        if(user) return {
            id: response._id,
            name: response.name,
            email: response.email
        }
        return false
    }

    async update(email, data){
        try {
            await collectionClient.updateOne({email: email}, {$set: data})
            return true
        } catch (e){
            console.log(e)
            return false
        }
    }

    async delete(email){
        try{
            await collectionClient.deleteOne({email: email})
            return true
        } catch(e){
            console.log(e)
            return false
        }

    }

}

module.exports = UserMongo