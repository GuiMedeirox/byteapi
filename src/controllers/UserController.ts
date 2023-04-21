import {Request, Response} from 'express'; 
import { prisma } from '../database';

export default{

    async createUser(request: Request, response: Response){        

        try{           
            
            const { name, phone, cpf, address } = request.body;            
            const userExist = await prisma.user.findUnique({ where: {cpf} });

            if(userExist){
                return response.json({ error: true, message: 'Erro: usuário já existente' });
            }
            
            const user = await prisma.user.create({ data: { address, cpf, name, phone } });
            
            return response.json({
                error: false, 
                message: 'Usuário cadastrado com sucesso!',
                user
                
            });
        }
        catch(error){
            return response.json({message: error.message});
        }
    }
};