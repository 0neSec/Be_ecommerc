const mainRouts = require('express').Router();
const UserRoutes = require('./user/userRoutes');
const roleRoutes = require('./role/roleRoutes');
const productRoutes = require('./product/productRoutes');
const authRoutes = require('./auth/authRoutes');
const categoryRoutes = require('./category/categoryRoutes');
const cartRoutes = require('./cart/cartRoutes');
const verifyRoutes = require('./auth/verifyRoutes');
const orderRoutes = require('./order/orderRoutes');


mainRouts.get('/', (req, res) => {
    res.send('<p>server berjalan</p>')
});
mainRouts.use('/api', UserRoutes);
mainRouts.use('/api', roleRoutes);
mainRouts.use('/api', productRoutes);
mainRouts.use('/api', authRoutes);
mainRouts.use('/api', categoryRoutes);
mainRouts.use('/api', cartRoutes);
mainRouts.use('/api', verifyRoutes);
mainRouts.use('/api', orderRoutes);



module.exports =  mainRouts;