import express from "express"
import mongoose from "mongoose"
// import userRoutes from './routes/userRoutes.js';
import { configDotenv } from "dotenv"
import cors from "cors"
import router from "./routes/userRoutes.js";
const app = express()
app.use(express.json())
configDotenv()
app.use(cors(
    {
        origin: "http://localhost:5173"
    }
))
const connectDb = () => {
    try {
        mongoose.connect('mongodb://localhost:27017/bank').then(() => {
            console.log("connected")
        })
    }
    catch (error) {
        console.error();
    }
}
connectDb()
app.listen(process.env.PORT, () => {
    console.log(`server listening on port ${process.env.PORT}`)
})

app.use('/api/users', router);

