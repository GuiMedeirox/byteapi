import { Request, Response } from 'express';
import { prisma } from '../database';

export default{
    
    async createMenu(request: Request, response: Response){        

        try{           
                    
            const {id, name, item, value } = request.body;            
            const menuExists = await prisma.menu.findUnique({ where: { id } });

            if(menuExists){
                return response.json({ error: true, message: 'Erro: menu já existente' });
            }
            
            const user = await prisma.menu.create({ data: { name, item, value } });
        
            return response.json({                
                message: 'Cardápio cadastrado com sucesso!',
                user
            
            });
        }
        catch(error){
            return response.json({message: error.message});
        }
    },

    async listMenu(request: Request, response: Response){        
        try{           
                      
            const { id } = request.params;            
            const menu = await prisma.menu.findUnique({ where: {id: Number(id)} });

            if(!menu){
                return response.json({ error: true, message: 'Erro: menu não existente' });
            }

            return response.json({ menu });
        }
        catch(error){
            return response.json({message: error.message});
        }
    },

    async listMenus(request: Request, response: Response){        
        try{           
            const menus = await prisma.menu.findMany();

            if(!menus){
                return response.json({ error: true, message: 'Não há pedidos cadastrados.' });
            }

            return response.json({ menus });
        }
        catch(error){
            return response.json({message: error.message});
        }
    },

    async updateMenu(request: Request, response: Response){        
        
        try{   
            const { id, item, name, value } = request.body; 
            const menuExists = await prisma.menu.findUnique({ where: {id: Number(id)} });
            if(!menuExists){
                return response.json({ error: true, message: 'Menu não cadastrado.' });
            }
          
            const menu = await prisma.menu.update({
                where: {
                    id: Number(request.body.id), 
                },
                data:{
                    item,
                    name, 
                    value
                }
            });

            return response.json({
                error:false,
                message:'Menu editado com sucesso',
                menu
            });

        }
        catch(error){
            return response.json({message: error.message});
        }
    },


    async deleteMenu(request: Request, response: Response){        
        
        try{   
            const { id } = request.params; 
            const menuExists = await prisma.order.findUnique({ where: {id: Number(id)} });
            if(!menuExists){
                return response.json({ error: true, message: 'O menu informado não está cadastrado.' });
            }
          
            const menu = await prisma.order.delete({
                where: {
                    id: Number(request.params.id), 
                },
            });

            return response.json({
                message:'Pedido deletado com sucesso',
                menu
            });

        }
        catch(error){
            return response.json({message: error.message});
        }
    }

};