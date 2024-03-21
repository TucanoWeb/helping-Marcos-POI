const {schemaPoints, schemaPointsDelete, schemaPointsUpdate} = require("../../controller/points/index.js")
const PointsMongo = require("../../services/points/index.js")

const client = new PointsMongo()

const pointRoute = [
    {
        method: "GET",
        path: "/points",
        handler: async (request, h) => {

            const points = await client.findAll()
            return {
                error: false,
                message: "Success",
                points
            }
        }
    },
    {
        method: "GET",
        path: "/points_details/{name}",
        handler: async (request, h) => {

            const points = await client.findOne(request.params.name)
            return {
                error: false,
                message: "Success",
                points
            }
        }
    },
    {
        method: "POST",
        path: "/create_point",
        handler: async (request, h) => {
            
            const validate = schemaPoints.validate(request.payload)

            if(validate.error){
                return {
                    error: true,
                    message: validate.error.message
                }
            }

            await client.createOne(request.payload)
            return {
                error: false,
                message: "Success"
            }

        }
    },
    {
        method: "PUT",
        path: "/update_point/{name}",
        handler: async (request, h) => {

            const arrErrors = []
            
            const validatePayload = schemaPoints.validate(request.payload)
            const validateParams = schemaPointsUpdate.validate(request.params.name)
          
            if(validatePayload.error) arrErrors.push(validatePayload.error.message)
            if(validateParams.error) arrErrors.push(validateParams.error.message)
                
            if(arrErrors.length > 0) return {
                    error: true,
                    messages: arrErrors
                }

            const response = await client.update(request.params.name, request.payload)
            if(response) return {
                error: false,
                message: "Point updated"
            }
            return {
                error: true,
                message: "Error"
            }

        }
    },
    {
        method: "DELETE",
        path: "/delete_point/{id}",
        handler: async (request, h) => {
            
            const validate = schemaPointsDelete.validate(request.params.id)

            if(validate.error){
                return {
                    error: true,
                    message: validate.error.message
                }
            }

            const response = await client.delete(request.params.id)
            if(response) return {
                error: false,
                message: "Point deleted"
            }
            return {
                error: true,
                message: "Error"
            }

        }
    },
]

module.exports = pointRoute
