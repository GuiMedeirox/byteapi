import { Request, Response } from 'express';
import { prisma } from '../database';

export default{

    async createOrder(request: Request, response: Response){        
        try{           
            const { userId:id , dateTimeOrder, description, price } = request.body;            
            const userExist = await prisma.user.findUnique({ where: { id } });

            if(!userExist){
                return response.json({ error: true, message: 'Erro: o Pedido informado não existe' });
            }          
            const order = await prisma.order.create({ data: { id , dateTimeOrder, description, price, status } });
            return response.json({
                error: false, 
                message: 'Pedido cadastrado com sucesso!',
                order
            });
        }
        catch(error){
            return response.json({message: error.message});
        }
    },

    async listOrder(request: Request, response: Response){        
        try{           
                        
            const { id } = request.params;            
            const order = await prisma.user.findUnique({ where: {id: Number(id)} });

            if(!order){
                return response.json({ error: true, message: 'Erro: pedido não existente' });
            }
  
            return response.json({ order });
        }
        catch(error){
            return response.json({message: error.message});
        }
    },

    async listOrders(request: Request, response: Response){        
        try{           
            const orders = await prisma.order.findMany();

            if(!orders){
                return response.json({ error: true, message: 'Não há pedidos cadastrados.' });
            }
  
            return response.json({ orders });
        }
        catch(error){
            return response.json({message: error.message});
        }
    },

    async updateOrder(request: Request, response: Response){        
        
        try{   
            const { id, description, price, status } = request.body; 
            const orderExists = await prisma.order.findUnique({ where: {id: Number(id)} });
            if(!orderExists){
                return response.json({ error: true, message: 'Pedido não cadastrado.' });
            }
            
            const order = await prisma.order.update({
                where: {
                    id: Number(request.body.id), 
                },
                data:{
                    description,
                    status,
                    price
                }
            });

            return response.json({
                error:false,
                message:'Pedido editado com sucesso',
                order
            });

        }
        catch(error){
            return response.json({message: error.message});
        }
    },

    async deleteOrder(request: Request, response: Response){        
        
        try{   
            const { id } = request.params; 
            const orderExists = await prisma.order.findUnique({ where: {id: Number(id)} });
            if(!orderExists){
                return response.json({ error: true, message: 'Pedido não cadastrado.' });
            }
            
            const order = await prisma.order.delete({
                where: {
                    id: Number(request.params.id), 
                },
            });

            return response.json({
                error:false,
                message:'Pedido deletado com sucesso',
                order
            });

        }
        catch(error){
            return response.json({message: error.message});
        }
    },
    

};