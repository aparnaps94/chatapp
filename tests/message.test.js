const request = require("supertest");
const app = require("../src/app");

let access;
let user2Id;

describe("Message API", () => {

    beforeAll(async () => {
        const email1 = `user1${Date.now()}@mail.com`;
        const email2 = `user2${Date.now()}@mail.com`;

        // register users
        await request(app).post("/auth/register").send({
            username: "user1",
            email: email1,
            password: "123456"
        });

        const res2 = await request(app).post("/auth/register").send({
            username: "user2",
            email: email2,
            password: "123456"
        });

        user2Id = res2.body._id;

        // login
        const login = await request(app).post("/auth/login").send({
            email: email1,
            password: "123456"
        });

        access = login.body.access;

        console.log("ACCESS TOKEN:", access); // 🔥 CHECK THIS
    });

    it("should send message", async () => {
        const res = await request(app)
            .post("/messages/send")
            .set("Authorization", `Bearer ${access}`)
            .send({
                receiver_id: user2Id,
                content: "Hello"
            });

        console.log("SEND RESPONSE:", res.body);

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("content", "Hello");
    });

    it("should get messages (pagination)", async () => {
        const res = await request(app)
            .get(`/messages/${user2Id}`)
            .set("Authorization", `Bearer ${access}`);

        console.log("GET RESPONSE:", res.body);

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });



    it("should get coversations", async () => {
        const res = await request(app)
            .get("/messages")
            .set("Authorization", `Bearer ${access}`);
        expect(res.statusCode).toBe(200);
    });
});


