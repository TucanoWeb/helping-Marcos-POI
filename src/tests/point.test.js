const Hapi = require("@hapi/hapi")
const { pointRoute } = require("../routes/index.js")

//data mock
const dataPoint ={
    name: "Point test",
    category_id: "65facfc7512384f47243048f",
    description: "any description"

}

let server

beforeAll(async () => {
    server = Hapi.server({
        port: 8081,
        host: "localhost"
    })

    server.route(pointRoute)
    await server.start()
}) 

afterAll(async () => await server.stop())


describe("Point routes", () => {

    test("GET Return all", async () =>{
        const res = await server.inject({
            method: "get",
            url: "/points"
        })
        expect(res.statusCode).toBe(200)
        
    })

    test("POST creating point", async () => {
        const userData = dataPoint
    
        const res = await server.inject({
            method: "post",
            url: "/create_point",
            payload: userData
        })
        expect(res.statusCode).toBe(200)
        expect(res.result).toEqual({
            error: false,
            message: "Success"
        })
    })

    test("UPDATE update point", async () => {
        const updateData = {
            name: "Point test updated",
            category_id: "65facfc7512384f47243048f",
            description: "any description"
        }
        const name = dataPoint
    .name
        const res = await server.inject({
            method: "put",
            url: `/update_point/${name}`,
            payload: updateData
        })
        expect(res.statusCode).toBe(200)
        expect(res.result).toEqual({
            error: false,
            message: "Point updated"
        })
    })


    test("DELETE delete point", async () => {
        const name = "Point test updated"

        const findOne = await server.inject({
            method: "get",
            url: `/points_details/${name}`,
        })

        const pointId = findOne.result.points._id.toString()

        const res = await server.inject({
            method: "delete",
            url: `/delete_point/${pointId}`,
        })
        expect(res.statusCode).toBe(200)
        expect(res.result).toEqual({
            error: false,
            message: "Point deleted"
        })
    })
})