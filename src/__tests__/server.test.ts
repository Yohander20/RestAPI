import {connectBD} from '../server'
import db from '../config/db'


jest.mock('../config/db')

describe('connectDB', ()=>{
    it('should handle database connection error', async ()=>{
        jest.spyOn(db,'authenticate')
            .mockRejectedValueOnce(new Error('Hubo un error al conectar la BD'))
        const consoleSpy = jest.spyOn(console,'log')
        
        await connectBD()

        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining('Hubo un error al conectar la BD')
        )
    })
})
