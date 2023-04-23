import {Request, Response} from 'express'; 
import { prisma } from '../database';
import bcrypt from 'bcrypt';

export default{

    async createUser(request: Request, response: Response){        

        try{           
                        
            const { username, password, name, phone, cpf, address } = request.body;       
            const hashedPassword = await bcrypt.hash(password, 10);
            const userExist = await prisma.user.findUnique({ where: { cpf } });

            if(userExist){
                return response.json({ error: true, message: 'Erro: usuário já existente' });
            }
            
            const user = await prisma.user.create({ data: { username, password:hashedPassword, address, cpf, name, phone } });
            
            return response.json({
                message: 'Usuário cadastrado com sucesso!',
                user
                
            });
        }
        catch(error){
            return response.json({message: error.message});
        }
    },

    async listUser(request: Request, response: Response){        
        try{           
                        
            const { id } = request.params;            
            const user = await prisma.user.findUnique({ where: {id: Number(id)} });

            if(!user){
                return response.json({ error: true, message: 'Erro: usuário não existente' });
            }
  
            return response.json({ user });
        }
        catch(error){
            return response.json({message: error.message});
        }
    },

    async listUsers(request: Request, response: Response){        
        try{                           
            const users = await prisma.user.findMany();
            if(!users){
                return response.json({ error: true, message: 'Não há usuários cadastrados ainda.' });
            }
            return response.json({ users });
        }
        catch(error){
            return response.json({message: error.message});
        }
    },

    async updateUser(request: Request, response: Response){        
        
        try{   
            const { id, name, cpf, phone, address, username, password } = request.body; 
            const userExists = await prisma.user.findUnique({ where: {id: Number(id)} });
            if(!userExists){
                return response.json({ error: true, message: 'Usuário não cadastrado.' });
            }
            
            const user = await prisma.user.update({
                where: {
                    id: Number(request.body.id), 
                },
                data:{
                    name,
                    cpf,
                    phone,
                    address
                }
            });

            return response.json({
                error:false,
                message:'Usuário editado com sucesso',
                user
            });

        }
        catch(error){
            return response.json({message: error.message});
        }
    },

    async deleteUser(request: Request, response: Response){        
        
        try{   
            const { id } = request.params; 
            const userExists = await prisma.user.findUnique({ where: {id: Number(id)} });
            if(!userExists){
                return response.json({ error: true, message: 'Usuário não cadastrado.' });
            }
            
            const user = await prisma.user.delete({
                where: {
                    id: Number(request.params.id), 
                },
            });

            return response.json({
                error:false,
                message:'Usuário deletado com sucesso',
                user
            });

        }
        catch(error){
            return response.json({message: error.message});
        }
    },

};