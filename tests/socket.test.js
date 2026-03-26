const io = require("socket.io-client");
const request = require("supertest");
const app = require("../src/app");
let access;
describe("socket test", () => {
    beforeAll(async () => {
        const res = await request(app).post("/auth/login").send({
            email: "aparna@gmail.com",
            password: "123456"
        });
        access = res.body.access;
    });
    it("should connect socket with token", (done) => {
        const socket = io("http://localhost:3000", { auth: { token: access } });


        socket.on("connect", () => {
            expect(socket.connected).toBe(true);
            socket.disconnect();
            done();
        });
    });
});