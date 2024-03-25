const { schemaUserCreate, schemaUserLogin, schemaUserDelete, schemaUserUpdate } = require("../../controller/user/index.js")
const UserMongo = require("../../services/users/index.js")

const client = new UserMongo()

// import generateID
const generateID = require("../../util/generateId.js")

const userRoute = [
    {
        method: "POST",
        path: "/login",
        handler: async (request, h) => {

            const validate = schemaUserLogin.validate(request.payload)

            if (validate.error) {
                return {
                    error: true,
                    message: validate.error.message
                }
            }

            // adjust to cookie settings
            const user = await client.login(request.payload)
            if (user) {
                const sid = generateID()
                h.state('poi-cookie', sid)

                return h.response({
                    error: false,
                    user
                }).state('poi-cookie', sid)
            }
            return {
                error: true,
                message: "Unauthorized"
            }

        },
        options: {
            auth: {
                mode: 'try',
                strategy: 'session'
            },
            plugins: {
                'hapi-auth-cookie': {
                    redirectTo: false
                }
            },
            // insert tag swagger
            tags: ["api"],
            description: "Login endpoint user",
            validate: {
                payload: schemaUserLogin
            }
        }
    },
    {
        method: "GET",
        path: "/",
        handler: (request, h) => {
            return "PONG!"
        },
        options: {
            tags: ["api"],
            description: "Test endpoint that returns PONG"
        }
    },
    {
        method: "GET",
        path: "/users",
        handler: async (request, h) => {

            const users = await client.findAll()
            return {
                error: false,
                message: "Success",
                users
            }
        }
    },
    {
        method: "POST",
        path: "/create_user",
        handler: async (request, h) => {

            const validate = schemaUserCreate.validate(request.payload)

            if (validate.error) {
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
        path: "/update_user/{email}",
        handler: async (request, h) => {

            const validate = schemaUserUpdate.validate(request.payload)

            if (validate.error) {
                return {
                    error: true,
                    message: validate.error.message
                }
            }

            const response = await client.update(request.params.email, request.payload)
            if (response) return {
                error: false,
                message: "User updated"
            }
            return {
                error: true,
                message: "Error"
            }

        }
    },
    {
        method: "DELETE",
        path: "/delete_user/{email}",
        handler: async (request, h) => {

            const validate = schemaUserDelete.validate(request.params.email)

            if (validate.error) {
                return {
                    error: true,
                    message: validate.error.message
                }
            }

            const response = await client.delete(request.params.email)
            if (response) return {
                error: false,
                message: "User deleted"
            }
            return {
                error: true,
                message: "Error"
            }

        }
    },
]

module.exports = userRoute
