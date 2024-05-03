import express from 'express';
import connectDB from './util/db.js';

import authRouter from './routers/auth.js';
import adminRouter from './routers/admin.js';
import userRouter from './routers/user.js';
import productRouter from './routers/product.js';

const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Credentials', 'true');
//     res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
//     next();
// });

app.use('/auth', authRouter);
app.use('/admin', adminRouter);
app.use('/user', userRouter);
app.use('/products', productRouter);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`API listening at port ${PORT}.`);
});
