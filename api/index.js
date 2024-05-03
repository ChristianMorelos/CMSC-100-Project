
import express from 'express';
import connectDB from './util/db.js';

import auth from './routers/admin.js';
import admin from './routers/admin.js';
import user from './routers/admin.js';
import product from './routers/admin.js';

const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Credentials', 'true');
//     res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
//     next();
// })

app.use('/auth', auth);
app.use('/admin', admin);
app.use('/user', user);
app.use('/products', product);

const PORT = 3000;

app.listen(PORT, () => { 
    console.log(`API listening at port ${PORT}.`)
});