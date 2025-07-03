import express from 'express'
import colors from 'colors'
import cors, {CorsOptions} from 'cors'
import morgan from 'morgan'
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

//Permitir conexiones

const allowedOrigins = [
    process.env.FRONTEND_URL,
    'http://localhost:4000/'
];


const corsOptions : CorsOptions={
    origin: function(origin,callback){
        console.log(origin)
        if(!origin || allowedOrigins.includes(origin)){
            callback(null,true)
            console.log('Permitir...')
        }else{
            callback(new Error('Error de CORS'))
            console.log('Error de CORS: Dominio no autorizado')
        }
    }
}

server.use(cors(corsOptions))

//Leer datos de formularios
server.use(express.json())

server.use(morgan('dev'))
server.use('/api/products',router)

//Docs
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec,swaggerUiOptions))





export default server