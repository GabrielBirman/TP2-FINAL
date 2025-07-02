// npm install --save-dev mocha chai supertest
// mocha y chaI trabajan generalmente juntas brindan la estructura (mocha) y el expect (chai)
// supertest permite pasar las url de manera más sencilla.

/* herramientas de documentación
swagger
@use JSDoc

https://swagger.io/
https://jsdoc.app/about-getting-started

*/
import { describe } from 'mocha'
import supertest from 'supertest'
import { expect } from 'chai'

// supertest me ayuda a configurar la url donde se apuntanlas pruebas

const url = supertest("http://localhost:8080")
let currentId = null
let token = null

// describe: agrupa uin bloque de test o "bloques de prueba" relacionado a la misma entidad, mismo problema
// no es neceasaria estrcutura de funciones o clasees, suypertest tiene su propia estructura
// describe no ehecuta ningún test
describe("Test entidad producto", () => {
    // it define una prueba en particular


    it("USER LOGIN: autenticar y guardar cookie", async () => {
        const response = await url.post("/usuarios/login").send({
            username: "abelardo",
            password: "1234"
        });

        const cookieHeader = response.headers["set-cookie"];
        expect(cookieHeader).to.exist;
        expect(cookieHeader[0]).to.include("token=");
        console.log(cookieHeader)

        // Guardar cookie para siguientes tests
        token = cookieHeader[0];
    })


    it("PRODUCTO GET all", async () => {

        const response = await url.get("/productos/").set("Authorization", token)
        //const response = await url.get("/productos/")
        //console.log("Data: ", response)
        expect(response.status).to.equal(200)
        expect(response.body).to.be.a("array")
    })

    it("PRODUCTO POST one", async () => {
        const response = await url.post("/productos/").set("Authorization", token).send(

            {
                nombre: "Amoxicilina",
                descuento: 0,
                presentacion: "Cápsulas",
                concentracion: "500 mg",
                precio: 300,
                stock: 498,
                laboratorio: "Laboratorios Genéricos S.A.",
                fecha_vencimiento: "2025-11-15",
                necesita_receta: true,
                imagen: "https://medisol.com.ar/wp-content/uploads/2023/10/medisol-amoxol-500-mg-comprimidos-recubiertos-10.jpg",
                descripcion: "Antibiótico utilizado para tratar infecciones bacterianas.",
                contraindicaciones: "No usar en caso de alergia a la penicilina o a cualquiera de los excipientes."
            })
        expect(response.status).to.equal(201)
        //expect(response.body).to.be.a("array")
        expect(response.body).to.have.property("insertedId");
        currentId = response.body.insertedId

    })

    it("PRODUCTO PATCH: 'nombre' post de prueba", async () => {

        const response = await url.patch(`/productos/update/${currentId}`)
            .set("Authorization", token)
            .send({ nombre: "otro nombre" })
        //console.log("Data: ", response)
        expect(response.status).to.equal(200)
        //expect(response.body).to.be.a("array")
    })

    it("PRODUCTO PUT one", async () => {
        const response = await url.put(`/productos/update/all/${currentId}`).set("Authorization", token).send(

            {
                nombre: "prueba",
                descuento: 0,
                presentacion: "prueba",
                concentracion: "prueba",
                precio: 300,
                stock: 498,
                laboratorio: "prueba",
                fecha_vencimiento: "prueba",
                necesita_receta: true,
                imagen: "https://medisol.com.ar/wp-content/uploads/2023/10/medisol-amoxol-500-mg-comprimidos-recubiertos-10.jpg",
                descripcion: "Antibiótico utilizado para tratar infecciones bacterianas.",
                contraindicaciones: "No usar en caso de alergia a la penicilina o a cualquiera de los excipientes."
            })
        expect(response.status).to.equal(200)
        //expect(response.body).to.be.a("array")
        expect(response.body).to.have.property("acknowledged");
    })


    it("PRODUCTO DELETE post de prueba", async () => {

        const response = await url.delete(`/productos/${currentId}`).set("Authorization", token)
        //const response = await url.get("/productos/")
        //console.log("Data: ", response)
        expect(response.status).to.equal(200)
        //expect(response.body).to.be.a("array")
    })

    it("PRODUCTO TEST ERROR POST: error estructura ", async () => {
        const response = await url.post("/productos/").set("Authorization", token).send(

            {
                nombre: 125,
                descuento: 0,
                presentacion: "Cápsulas",
                concentracion: "500 mg",
                precio: "300",
                stock: 498,
                laboratorio: "Laboratorios Genéricos S.A.",
                fecha_vencimiento: 20251125,
                necesita_receta: true,
                imagen: "https://medisol.com.ar/wp-content/uploads/2023/10/medisol-amoxol-500-mg-comprimidos-recubiertos-10.jpg",
                descripcion: "Antibiótico utilizado para tratar infecciones bacterianas.",
                contraindicaciones: "No usar en caso de alergia a la penicilina o a cualquiera de los excipientes."
            })
        expect(response.status).to.equal(201)
        //expect(response.body).to.be.a("array")
        expect(response.body).to.have.property("insertedId");
        currentId = response.body.insertedId

    })

    it("USER TEST ERROR: bad password", async () => {
        const response = await url.post("/usuarios/login").send({
            username: "abelardo",
            password: "4321"
        });

        const cookieHeader = response.headers["set-cookie"];
        expect(cookieHeader).to.exist;
        expect(cookieHeader[0]).to.include("token=");       
    })

     it("USER GET all", async () => {

        const response = await url.get("/usuarios/").set("Authorization", token)
        //const response = await url.get("/productos/")
        //console.log("Data: ", response)
        expect(response.status).to.equal(200)
        expect(response.body).to.be.a("array").that.has.length.of.at.least(1)
    })


})
