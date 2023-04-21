import Express from 'express';
import UserController from './controllers/UserController';
 
const app = Express();

app.get('/', (request, response) => {
    return response.send({message: 'Coe'});
});

app.post('/createUser', UserController.createUser );

app.use(Express.json());
app.listen(3000, () => console.log('Server listening on port 3000 :)' ));