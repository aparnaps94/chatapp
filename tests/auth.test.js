const request = require("supertest");
const app = require("../src/app");

describe("Auth API", () => {

    //REGISTER

    it("register a new user", async () => {
        const res = await request(app)
            .post("/auth/register")
            .send({
                username: "nikku",
                email: "nikku@gmail.com",
                password: "123456"
            });
        expect(res.statusCode).toBe(201);

    });

    //login

    it("should login user", async () => {
        const res = await request(app)
            .post("/auth/login")
            .send({
                email: "appu@gmail.com",
                password: "123456"
            });
        token = res.body.access;
        refreshToken = res.body.refresh;
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("access");
        expect(res.body).toHaveProperty("refresh")
    });
    //refresh token

    it("should be refresh token", async () => {
        const res = await request(app)
            .post("/auth/refresh")
            .send({ refreshToken })
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("access")
    });

    //PROTECTED ROUTE

    it("should access protected route", async () => {
        const res = await request(app)
            .get("/messages")
            .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(200);

    })
}

);