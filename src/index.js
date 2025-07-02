import express from 'express'
import YAML from 'yamljs'
import swaggerUi from 'swagger-ui-express'
import productoRouter from "./routes/producto.router.js"
import userRoutes from "./routes/user.router.js"
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = 8080
const swaggerDocument = YAML.load("./openapi.yaml");
app.use (express.json())
app.use ("/productos", new productoRouter().start())
app.use ("/usuarios", new userRoutes().start())
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use ((req,res) => {
    res.status(404).json({
        code: 404,
        message: 'recurso no encontrado'
    })
})



app.listen(PORT, ()=> console.log (`Server running at http://localhost:${PORT}`))