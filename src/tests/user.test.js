const Hapi = require("@hapi/hapi")
const { userRoute } = require("../routes/index.js")

//dataUser mock
const dataUser ={
    name: "test",
    email: "test@gmail.com",
    password: "123456"
}

let server

beforeAll(async () => {
    server = Hapi.server({
        port: 8081,
        host: "localhost"
    })

    server.route(userRoute)
    await server.start()
}) 

afterAll(async () => await server.stop())


describe("User routes", () => {

    test("GET Return PONG!", async () =>{
        const res = await server.inject({
            method: "get",
            url: "/"
        })
        expect(res.statusCode).toBe(200)
        expect(res.payload).toBe("PONG!")
    })

    test("POST creating user", async () => {
        const userData = dataUser
        const res = await server.inject({
            method: "post",
            url: "/create_user",
            payload: userData
        })
        expect(res.statusCode).toBe(200)
        expect(res.result).toEqual({
            error: false,
            message: "Success"
        })
    })

    test("UPDATE update user", async () => {
        const updateData = {email: dataUser.email, name: "test update", password: dataUser.password}
        const email = dataUser.email
        const res = await server.inject({
            method: "put",
            url: `/update_user/${email}`,
            payload: updateData
        })
        expect(res.statusCode).toBe(200)
        expect(res.result).toEqual({
            error: false,
            message: "User updated"
        })
    })

    test ("LOGIN login user", async () => {
        const loginData = {email: dataUser.email, password: dataUser.password}
        const res = await server.inject({
            method: "post",
            url: "/login",
            payload: loginData
        })
        expect(res.statusCode).toBe(200)
        expect(res.result).toHaveProperty("user")
    })

    test("DELETE delete user", async () => {
        const email = dataUser.email
        const res = await server.inject({
            method: "delete",
            url: `/delete_user/${email}`,
        })
        expect(res.statusCode).toBe(200)
        expect(res.result).toEqual({
            error: false,
            message: "User deleted"
        })
    })
})