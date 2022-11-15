import {Router} from "express";
import {pool} from "../db_connect";

const router = Router()

//create a todo
router.post("/", async (req, res, next)=>{
    try{
        const {description} = req.body
        const createdTodo = await pool.query(
            "INSERT INTO todo (description) VALUES($1) RETURNING *",
            [description]
        )
        res.json(createdTodo.rows[0]).status(200)
    }catch (err){
        console.error(err)
        res.json(err).status(400)
    }
})

//get all todos
router.get("/", async (req, res, next)=>{
    try{
        const allTodos = await pool.query("SELECT * FROM todo")
        res.json(allTodos.rows).status(200)
    }catch (err){
        console.error(err)
        res.json(err).status(400)
    }
})

//get a todo
router.get("/:id", async (req, res, next)=>{
    try{
        const {id} = req.params
        const allTodos = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id])
        res.json(allTodos.rows).status(200)
    }catch (err){
        console.error(err)
        res.json(err).status(400)
    }
})

//update a todo
router.put("/:id", async (req, res, next)=>{
    try{
        const {id} = req.params
        const {description} = req.body

        const updatedTodo = await pool.query(
            "UPDATE todo SET description = $1 WHERE todo_id = $2 RETURNING *",
            [description, id]
        )

        res.json(updatedTodo.rows[0]).status(200)
    }catch (err){
        console.error(err)
        res.json(err).status(400)
    }
})

//delete a todo
router.delete("/:id", async (req, res, next)=>{
    try{
        const {id} = req.params

        const deletedTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id])
        res.json(deletedTodo).status(200)
    }catch (err){
        console.error(err)
        res.json(err).status(400)
    }
})

export default router
