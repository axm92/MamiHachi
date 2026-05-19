
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import menuRoutes from './routes/menu.js'
import orderRoutes from './routes/orders.js'

// dotenv.config();
console.log('MONGO_URI:', process.env.MONGO_URI);
dotenv.config();

const app = express();

//middleware
app.use(cors({
    origin: process.env.CLIENT_URL || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}))
app.use(express.json())

//routes
app.use('/api/menu', menuRoutes)
app.use('/api/orders', orderRoutes)

app.get('/', (req,res) => res.json({message: 'Mami Hachi API is running...'}))

//connecting to mongo
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('COnnected to MongoDB Atlas')
        app.listen(process.env.PORT || 5000, () => {
            console.log('Server running on port ${process.env.PORT || 5000')
        })
    })
    .catch(err => {
        console.error('MongoDB connection error:', err)
        process.exit(1)
    })