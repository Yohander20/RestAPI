import {Request,Response} from 'express'
import Product from '../models/Product.model'

export const getProducts= async (req: Request, res: Response)=>{
    
        const products = await Product.findAll({
            order:[
                ['id','DESC']
            ],
            attributes: {exclude: ['createdAt','updatedAt']}
        })
        res.json({data: products})
   
}

export const getProductsById= async (req: Request, res: Response)=>{
    
        const{id} = req.params
        const product = await Product.findByPk(id)

        if(!product){
                res.status(400).json({
                error: 'Producto No Encontrado'
                
            })
            return
        }
        res.json({data:product})
    
}

export const createProduct = async (req: Request,res: Response)=>{
    
    
         const product = await Product.create(req.body)
         res.status(201).json({data:product})
   
}

export const updateProduct = async(req:Request,res: Response)=>{
        
    const{id} = req.params
    const product = await Product.findByPk(id)

        if(!product){
                res.status(400).json({
                error: 'Producto No Encontrado'
                
            })
    
}
    //Actualizar
    await product.update(req.body)
    await product.save()

    res.json({data:product})
}

export const updateAvailability = async(req:Request,res: Response)=>{
        
    const{id} = req.params
    const product = await Product.findByPk(id)

        if(!product){
                res.status(400).json({
                error: 'Producto No Encontrado'
                
            })
    
}
    //Actualizar
    product.availability= !product.dataValues.availability
    await product.save()

    console.log(product.dataValues)

    res.json({data:product})
}

export const deleteProduct = async(req:Request,res: Response)=>{
        
    const{id} = req.params
    const product = await Product.findByPk(id)

        if(!product){
                res.status(400).json({
                error: 'Producto No Encontrado'
                
            })
    
}

await product.destroy()
res.json({data: 'Producto Eliminado'})
    
}