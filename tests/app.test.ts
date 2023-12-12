import request from "supertest"
import app from "../src/app"

describe("POST Obtener Token",()=>{
    describe("Dado la información completa de la tarjeta",()=>{
        

        test("Debe responder con un estado 200", async()=>{
            const numRam = Math.floor(Math.random() * (8999)+1000)
            const response =await request(app).post("/tokens").send(
                {
                    "email":"julio.perez"+String(numRam)+"@gmail.com",
                    "card_number":"4111111111111111",
                    "cvv":123,
                    "expiration_year":"2025",
                    "expiration_month":9
                }
            )  
            expect(response.statusCode).toBe(200)  
        })
        //
        test("Debe generarse el token correctamente", async()=>{
            const numRam = Math.floor(Math.random() * (8999)+1000)
            const response =await request(app).post("/tokens").send(
                {
                    "email":"julio.perez"+String(numRam)+"@gmail.com",
                    "card_number":"4111111111111111",
                    "cvv":123,
                    "expiration_year":"2025",
                    "expiration_month":9
                }
            )  
            expect(response.body.card.token).toBeDefined()
        })
        //
        test("Debe especificar el content-type : JSON en el header", async()=>{
            const numRam = Math.floor(Math.random() * (8999)+1000)
            const response =await request(app).post("/tokens").send(
                {
                    "email":"julio.perez"+String(numRam)+"@gmail.com",
                    "card_number":"4111111111111111",
                    "cvv":123,
                    "expiration_year":"2025",
                    "expiration_month":9
                }
            )  
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
        })
    })
})