const Hapi = require("@hapi/hapi")
const { categoryRoute } = require("../routes/index.js")

//data mock
const dataCategory ={
    name: "Category test"
}

let server

beforeAll(async () => {
    server = Hapi.server({
        port: 8081,
        host: "localhost"
    })

    server.route(categoryRoute)
    await server.start()
}) 

afterAll(async () => await server.stop())


describe("Category routes", () => {

    test("GET Return all", async () =>{
        const res = await server.inject({
            method: "get",
            url: "/categories"
        })
        expect(res.statusCode).toBe(200)
        
    })

    test("POST creating category", async () => {
        const userData = dataCategory
        const res = await server.inject({
            method: "post",
            url: "/create_category",
            payload: userData
        })
        expect(res.statusCode).toBe(200)
        expect(res.result).toEqual({
            error: false,
            message: "Success"
        })
    })

    test("UPDATE update category", async () => {
        const updateData = {name: "Category test update"}
        const name = dataCategory.name
        const res = await server.inject({
            method: "put",
            url: `/update_category/${name}`,
            payload: updateData
        })
        expect(res.statusCode).toBe(200)
        expect(res.result).toEqual({
            error: false,
            message: "Category updated"
        })
    })


    test("DELETE delete category", async () => {
        const name = "Category test update"

        const findOne = await server.inject({
            method: "get",
            url: `/categories_details/${name}`,
        })

        const categoryId = findOne.result.categories._id.toString()
        console.log(categoryId)

        const res = await server.inject({
            method: "delete",
            url: `/delete_category/${categoryId}`,
        })
        expect(res.statusCode).toBe(200)
        expect(res.result).toEqual({
            error: false,
            message: "Category deleted"
        })
    })
})