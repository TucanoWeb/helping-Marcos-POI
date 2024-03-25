const Hapi = require("@hapi/hapi")
const { analyticsRoute } = require("../routes/index.js")

let server

beforeAll(async () => {
    server = Hapi.server({
        port: 8081,
        host: "localhost"
    })

    server.route(analyticsRoute)
    await server.start()
}) 

afterAll(async () => await server.stop())


describe("Analytics routes", () => {

    test("GET Return all", async () =>{
        const res = await server.inject({
            method: "get",
            url: "/analytics"
        })
        expect(res.statusCode).toBe(200)
        expect(res.result.error).toBe(false)
        
    })

})