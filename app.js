const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const db = require('./app/models');
const mainRouts = require('./app/routes')

dotenv.config();

const app = express();


const corsOptions = {
    origin: "*"
}

const mongooseConfig = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

db.mongoose.connect(db.url, mongooseConfig)
    .then(() => console.log("database connected"))
    .catch(err => {
        console.log(`gagal connected ${err.message}`);
        process.exit();
    })

app.use(cors());
app.use(express.json())



app.use('/', mainRouts)


const port = process.env.PORT

app.listen(port, () => {
    console.log(`server berjalan di Port ${port}`);
})