const dbConfig = require("../config/database");
const mongoose = require("mongoose");



module.exports = {
    mongoose,
    url: dbConfig,
    user: require('./userModel')(mongoose),
    product: require('./ProductModel')(mongoose),
    role: require('./roleModel')(mongoose),
    category: require('./categoryModel')(mongoose),


}