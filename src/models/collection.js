const db = require("./db")

// get collection using params
const collection = (collectionName) => db.collection(collectionName)

module.exports = collection