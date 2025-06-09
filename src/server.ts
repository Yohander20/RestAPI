import express from 'express'
import colors from 'colors'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec, {swaggerUiOptions} from './config/swagger'
import router from './router'
import db from './config/db'


//Conectar a base de datos
export async function connectBD(){
    try {
        await db.authenticate()
        db.sync()
       // console.log(colors.magenta('Conexion exitosa a la BD'))
    } catch (error) {
       // console.log(error)
        console.log(colors.bgRed.white ('Hubo un error al conectar la BD'))
    }
}

connectBD()
//Instancia de express
const server = express()

//Leer datos de formularios
server.use(express.json())

server.use('/api/products',router)

//Docs
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec,swaggerUiOptions))





export default server