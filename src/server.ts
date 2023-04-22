import Express from 'express';
import userController from './controllers/userController';
import orderController from './controllers/orderController';
import menuController from './controllers/menuController';
 
const app = Express();

app.use(Express.json());

app.get('/', (request, response) => { return response.send({message: 'Coe'}); });

app.post('/createUser', userController.createUser );
app.post('/createOrder', orderController.createOrder );
app.post('/createMenu', menuController.createMenu );
app.get('/listUser/:id', userController.listUser); //get user by id
app.get('/listUsers', userController.listUsers); // get all users
app.get('/listMenu/:id', menuController.listMenu); //get menu by id
app.get('/listMenus', menuController.listMenus); // get all menus
app.get('/listOrder/:id', orderController.listOrder); //get order by id
app.get('/listOrders', orderController.listOrders); // get all orders
app.put('/updateUser', userController.updateUser); // update user
app.put('/updateOrder', orderController.updateOrder); //update order
app.put('/updateMenu', menuController.updateMenu); //update menu
app.delete('/deleteMenu', menuController.deleteMenu); // delete menu
app.delete('/deleteOrder/:id', orderController.deleteOrder); // delete order
app.delete('/deleteUser/:id', userController.deleteUser); // delete user

app.listen(3000, () => console.log('Server listening on port 3000 :)' ));