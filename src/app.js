const Hapi = require("@hapi/hapi")

// swagger set up
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('../package.json');
const Boom = require('@hapi/boom');

// start routes
const { userRoute, categoryRoute, pointRoute, analyticsRoute } = require("./routes/index.js")


const init = async () => {
    const server = Hapi.server({
        port: 8081,
        host: "localhost"
    })

    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: {
                info: {
                    title: 'API Documentation',
                    version: Pack.version,
                },
            }
        },
        require('@hapi/cookie')
    ])


    // Set up the session strategy
    server.auth.strategy('session', 'cookie', {
        cookie: {
            name: 'poi-cookie',
            password: '&Hqrp&=PHCf>1i1hY;;FqHCA^@uLCW)P',
            isSecure: false
        }
    })

    // Define a session validation function
    server.auth.scheme('session', () => {
        return {
            authenticate: async (request, h) => {
                const session = request.state.poi - cookie

                if (!session.isValid) {
                    throw Boom.unauthorized('Invalid session')
                }

                return h.authenticated({ credentials: session })
            }
        }
    })

    server.auth.default('session');

    // routes
    server.route(userRoute)
    server.route(categoryRoute)
    server.route(pointRoute)
    server.route(analyticsRoute)


    await server.start()
    console.log("Server running ...", server.info.uri)

}

init()