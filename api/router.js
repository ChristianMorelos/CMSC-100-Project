import { auth } from './controllers/auth.js';
import { admin } from './controllers/admin.js';
import { user } from './controllers/user.js';
import { product } from './controllers/product.js';

const router = (app) => {

    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
        next();
    })

    app.post('/auth/register', auth.register);
    app.post('/auth/login', auth.login);

    app.get('/admin/sales', admin.getSales);
    app.get('/admin/users', admin.getUsers);
    app.get('/admin/orders', admin.getOrders);
    app.post('/admin/add-products', admin.addProduct);
    app.post('/admin/order-fulfillment', admin.fulfillOrder);

    app.get('/products', product.getAllProducts);

    app.post('/user/checkout-order', user.checkoutOrder);
    app.delete('/user/cancel-order', user.cancelOrder);
    app.get('/user/orders', user.getOrders);
};

export default router;
