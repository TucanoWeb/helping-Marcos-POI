const {schemaCategory, schemaCategoryUpdate, schemaCategoryDelete} = require("../../controller/category/index.js")
const CategoryMongo = require("../../services/category/index.js")

const client = new CategoryMongo()

const categoryRoute = [
    {
        method: "GET",
        path: "/categories",
        handler: async (request, h) => {

            const categories = await client.findAll()
            return {
                error: false,
                message: "Success",
                categories
            }
        }
    },
    {
        method: "GET",
        path: "/categories_details/{name}",
        handler: async (request, h) => {

            const categories = await client.findOne(request.params.name)
            return {
                error: false,
                message: "Success",
                categories
            }
        }
    },
    {
        method: "POST",
        path: "/create_category",
        handler: async (request, h) => {
            
            const validate = schemaCategory.validate(request.payload)

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
        path: "/update_category/{name}",
        handler: async (request, h) => {

            const arrErrors = []
            
            const validatePayload = schemaCategory.validate(request.payload)
            const validateParams = schemaCategoryUpdate.validate(request.params.name)
          
            if(validatePayload.error) arrErrors.push(validatePayload.error.message)
            if(validateParams.error) arrErrors.push(validateParams.error.message)
                
            if(arrErrors.length > 0) return {
                    error: true,
                    messages: arrErrors
                }

            const response = await client.update(request.params.name, request.payload)
            if(response) return {
                error: false,
                message: "Category updated"
            }
            return {
                error: true,
                message: "Error"
            }

        }
    },
    {
        method: "DELETE",
        path: "/delete_category/{id}",
        handler: async (request, h) => {
            
            const validate = schemaCategoryDelete.validate(request.params.id)

            if(validate.error){
                return {
                    error: true,
                    message: validate.error.message
                }
            }

            const response = await client.delete(request.params.id)
            if(response) return {
                error: false,
                message: "Category deleted"
            }
            return {
                error: true,
                message: "Error"
            }

        }
    },
]

module.exports = categoryRoute
