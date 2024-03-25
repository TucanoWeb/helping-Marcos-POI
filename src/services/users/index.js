const collection = require("../../models/collection")

const collectionClient = collection("users")

// implement bycript
const bcrypt = require('bcrypt');

class UserMongo {

    async findAll() {
        const res = await collectionClient.find({}).toArray()
        if (res) return res
        return false
    }

    auth(response, password) {
        // in the login, already verify if user with the respective email exists. So we'll verify now just password
        // return bcrypt.compareSync(password, response.password)

        if (response.password === password) return true
        return false

    }

    async createOne(data) {
        try {
            await collectionClient.insertOne(data)
            return true
        } catch (e) {
            console.log(e)
            return e
        }
    }

    async login(request) {

        const email = request.email
        const password = request.password

        const response = await collectionClient.findOne({ email: email })

        const user = this.auth(response, password)

        if (user) return {
            id: response._id,
            name: response.name,
            email: response.email
        }
        return false
    }

    async update(email, data) {
        try {
            await collectionClient.updateOne({ email: email }, { $set: data })
            return true
        } catch (e) {
            console.log(e)
            return false
        }
    }

    async delete(email) {
        try {
            await collectionClient.deleteOne({ email: email })
            return true
        } catch (e) {
            console.log(e)
            return false
        }

    }

}

module.exports = UserMongo