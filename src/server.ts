import Express from 'express';
import UserController from './controllers/UserController';
import OrderController from './controllers/OrderController';
 
const app = Express();

app.use(Express.json());

app.get('/', (request, response) => {
    return response.send({message: 'Coe'});
});

app.post('/createUser', UserController.createUser );
app.post('/createOrder', OrderController.createOrder );
app.get('/listUser/:id', UserController.listUser); //get user by id
app.get('/listUsers', UserController.listUsers); // get all users
app.get('/listOrder/:id', OrderController.listOrder); //get order by id
app.get('/listOrders', OrderController.listOrders); // get all orders
app.put('/updateUser', UserController.updateUser); // update user
app.put('/updateOrder', OrderController.updateOrder); //update order
app.delete('/deleteOrder/:id', OrderController.deleteOrder); // delete order
app.delete('/deleteUser/:id', UserController.deleteUser); // delete user

app.listen(3000, () => console.log('Server listening on port 3000 :)' ));