import chai from "chai";
import supertest from "supertest";

const expect = chai.expect;
const requester = supertest(`http://localhost:8080`);

describe("Testing products api", () => {
    describe("GET /api/products", () => {
        it("should return an array of products", () => {
            requester.get("/api/products").end((err, res) => {
                expect(res.body.payload).to.be.an("array");
            });
        });
    });
    describe("GET /api/products/:pid", () => {
        it("should return a product", () => {
            requester.get("/api/products/64b98d0c0822d7f5e617d34a").end(async (err, res) => {
                expect(await res.body).to.be.an("object");
            });
        });
        it("should return a 400 not found error", () => {
            requester.get("/api/products/64").end((err, res) => {
                expect(res.status).to.be.equal(400);
            });
        });
    });
    describe("POST /api/products", () => {
        it("should return a 200 created status", () => {
            const mockProduct = {
                title: "test",
                description: "test description",
                code: "test",
                price: 1000,
                stock: 1,
                category: "category test",
            }
            requester.post("/api/products").send(mockProduct).end( async(err, res) => {
                expect(await res.body.payload).to.be.an("object");
                expect(await res.body.payload).to.have.property("_id");
                expect(await res.body.payload).to.have.property("status");
                expect(await res.body.payload).to.have.property("owner");
                expect(res.status).to.be.equal(200);
            });
        });
        it("should return a 400 bad request status", () => {
            const mockProduct = {
                title: "test",
                description: "test description",
                code: "test",
                price: 1000,
                stock: 1,
            }
            requester.post("/api/products").send(mockProduct).end((err, res) => {
                expect(res.status).to.be.equal(400);
            });
        });
    });
});

describe ("Testing carts api", () => {
    describe("POST /api/carts", () => {
        it("should return a 200 created status", () => {
            requester.post("/api/carts").send().end(async (err, res) => {
                expect(await res.body.payload).to.have.property("_id");
                expect(res.status).to.be.equal(200);
            });
        });
    });
    describe("GET /api/carts/:cid", () => {
        it("should return an array with products", () => {
            requester.get("/api/carts/64a9c19ac02d171cd2e8b40d").end(async (err, res) => {
                expect(await res.body.payload).to.be.an("array");
            });
        });
        it("should return a 400 not found error", () => {
            requester.get("/api/carts/64").end((err, res) => {
                expect(res.status).to.be.equal(400);
            });
        });
    });
    describe("POST /api/carts/:cid/product/pid", () => {
        it("should return a 200 ok status", () => {
            requester.post("/api/carts/64a9c19ac02d171cd2e8b40d/product/64b98d0c0822d7f5e617d34a").send().end((err, res) => {
                expect(res.status).to.be.equal(200);
            });
        });
        it("should return a 400 bad request status", () => {
            requester.post("/api/carts/64a9c19ac02d171cd2e8b40d/product/64").send().end((err, res) => {
                expect(res.status).to.be.equal(400);
            });
        });
    });
});

describe ("Testing sessions api", () => {
    describe("POST /api/sessions/register", () => {
        it("should redirect for existing user", () => {
            const mockUser = {
                email: "test@test.com",
                password: "test",
                first_name: "test",
                last_name: "test",
                age: 18,
                role: "user"
            }
            requester.post("/api/sessions/register").send(mockUser).end((err, res) => {
                expect(res.status).to.be.equal(302);
            });
        });
    });
    describe("POST /api/sessions/login", () => {
        it("should login an user", () => {
            const mockUser = {
                email: "test@test.com",
                password: "test"
            }
            requester.post("/api/sessions/login").send(mockUser).end(async (err, res) => {
                expect(await _body.user).to.be.ok;
            });
        });
    });
    describe("POST /api/sessions/logout", () => {
        it("should logout an user and redirect", () => {
            requester.post("/api/sessions/logout").send().end((err, res) => {
                expect(res.status).to.be.equal(302);
            });
        });
    });
});