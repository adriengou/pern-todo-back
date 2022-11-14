import express from "express"
import cors from "cors"
import {EXPRESS_PORT} from "./environment";
import todoApi from "./apis/todo_api";


const app = express()

//middlewares
app.use(cors())
app.use(express.json())

//api routes
app.use('/api/todo', todoApi)

app.listen(EXPRESS_PORT, ()=>{
    console.log("server is listening on port 5000")
})
