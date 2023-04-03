const express = require('express')
require('dotenv').config()
require('express-async-errors')
const app = express()
const port = process.env.PORT || 5000
const connectDb = require('./database/connectDb')
const productRoutes = require('./routes/productRoutes')
const partyRoutes = require('./routes/partyRoutes')
const partyProductRoutes = require('./routes/partyProductRoutes')
const userRoutes = require('./routes/userRoutes')
const billBookRoutes = require('./routes/billBookroutes')
const cors = require('cors')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const NotFoundMiddleware = require('./middleware/NotFound')
const errorHandlerMiddleware = require('./middleware/ErrorHandler')

const corsOrigin = {
    origin:'http://localhost:3000', //or whatever port your frontend is using
    credentials: true,
    withCredentials: true
}

app.use(cors(corsOrigin))
app.use(cookieParser())
app.use(express.json())
app.use(morgan('tiny'))
app.use(express.urlencoded())


app.use('/api/v1/product', productRoutes)
app.use('/api/v1/party', partyRoutes)
app.use('/api/v1/party-product', partyProductRoutes)
app.use('/api/v1/user', userRoutes)
app.use('/api/v1/bill-book', billBookRoutes)



app.use(NotFoundMiddleware)
app.use(errorHandlerMiddleware)

const start = async () => {
    try {
        await connectDb(process.env.MONGO_URI)
        app.listen(port, () => { console.log(`Server is listening at ${port}`) })
    } catch (err) {
        console.log(err)
    }
}  

start()