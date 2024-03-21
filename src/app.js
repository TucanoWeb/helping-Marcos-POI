const Hapi = require("@hapi/hapi")

// start routes
const { userRoute, categoryRoute, pointRoute } = require("./routes/index.js")

const init = async () => {
    const server = Hapi.server({
        port: 8081,
        host: "localhost"
    })

    // routes
    server.route(userRoute)
    server.route(categoryRoute)
    server.route(pointRoute)


await server.start()
console.log("Server running ...", server.info.uri)

}

init()