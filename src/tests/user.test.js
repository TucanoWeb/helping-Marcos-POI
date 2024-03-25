const Hapi = require("@hapi/hapi")
const { userRoute } = require("../routes/index.js")
require("dotenv").config()

//dataUser mock
const dataUser = {
    name: "test",
    email: "test@gmail.com",
    password: "123456"
}

const login = {
    email: process.env.USERTOTEST,
    password: process.env.USERPASSTOTEST
}

let server

beforeAll(async () => {
    server = Hapi.server({
        port: 8081,
        host: "localhost"
    })

    await server.register(require('@hapi/cookie'))

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

    server.route(userRoute)
    await server.start()
})

afterAll(async () => await server.stop())


describe("User routes", () => {

    let cookie = ""

    test("LOGIN login user", async () => {
        const loginData = { email: login.email, password: login.password }

        const res = await server.inject({
            method: "post",
            url: "/login",
            payload: loginData
        })

        if (res.headers['set-cookie']) {
            cookie = res.headers['set-cookie'][0].split(';')[0];
        }

        expect(res.statusCode).toBe(200)
        expect(res.result).toHaveProperty("user")
    })

    test("POST creating user", async () => {
        const userData = dataUser
        const res = await server.inject({
            method: "post",
            url: "/create_user",
            payload: userData,
            headers: {
                cookie: cookie
            }
        })
        expect(res.statusCode).toBe(200)
        expect(res.result).toEqual({
            error: false,
            message: "Success"
        })
    })

    test("GET Return PONG!", async () => {
        const res = await server.inject({
            method: "get",
            url: "/",
            headers: {
                cookie: cookie
            }
        })
        expect(res.statusCode).toBe(200)
        expect(res.payload).toBe("PONG!")
    })

    test("GET Return users!", async () => {
        const res = await server.inject({
            method: "get",
            url: "/users",
            headers: {
                cookie: cookie
            }
        })
        expect(res.statusCode).toBe(200)
        expect(res.result.error).toBe(false)
    })

    test("POST creating user with error", async () => {
        const res = await server.inject({
            method: "post",
            url: "/create_user",
            payload: {},
            headers: {
                cookie: cookie
            }
        })
        expect(res.statusCode).toBe(200)
        expect(res.result.error).toEqual(true)
    })

    test("UPDATE update user", async () => {
        const updateData = { email: dataUser.email, name: "test update", password: dataUser.password }
        const email = dataUser.email
        const res = await server.inject({
            method: "put",
            url: `/update_user/${email}`,
            payload: updateData,
            headers: {
                cookie: cookie
            }
        })
        expect(res.statusCode).toBe(200)
        expect(res.result).toEqual({
            error: false,
            message: "User updated"
        })
    })

    test("DELETE delete user", async () => {
        const email = dataUser.email
        const res = await server.inject({
            method: "delete",
            url: `/delete_user/${email}`,
            headers: {
                cookie: cookie
            }
        })
        expect(res.statusCode).toBe(200)
        expect(res.result).toEqual({
            error: false,
            message: "User deleted"
        })
    })
})