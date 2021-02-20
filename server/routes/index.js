const express = require("express");
const router = express.Router();
const pool = require("./db/index");

//voy  a postear un query y luego desde postman hacer un post a 1337y verlo desde psql
//CUIDADO MANDAR CON POSTMAN EN FORMATO RAW JSON !!!! sino el contenido de description viene como null!
//POST localhost:1337/api/todos
// { "description": "clean my lalala" }

router.post("/todos", async (req, res) => {
	try {
		const { description } = req.body;
		const baseQuery = "INSERT INTO todo (description) VALUES($1) RETURNING *";

		const newTodo = await pool.query(baseQuery, [description]);
		res.json(newTodo.rows[0]);
	} catch (err) {
		console.error(err.message);
	}
});

//AHORA EN LA RUTA /api/todos QUIERO VER TODOS LOS 	todos !!!
//lo hago con un get
router.get("/todos", async (req, res) => {
	try {
		const baseQuery = "SELECT * FROM todo";

		const allTodos = await pool.query(baseQuery);
		res.json(allTodos.rows);
	} catch (err) {
		console.error(err.message);
	}
});

//AHORA QUIERO HACER UN GET DE UN todo en PARTICULAR USANDO url parametrizada
//localhost:1337/api/todos/:id
//VOY A TENER Q USAR REQ.PARAMS.ID y cambiar la query con un WHERE

router.get("/todos/:id", async (req, res) => {
	try {
		const baseQuery = "SELECT * FROM todo WHERE tid = $1";
		const { id } = req.params;
		const todo = await pool.query(baseQuery, [id]);
		//res.json(todo.rows)//asi llega [{"tid": "id", "descripcion":"order"}]
		res.json(todo.rows[0]); //asi llega solo como { ....}
	} catch (err) {
		console.error(err.message);
	}
	//POSTMAN GET localhost:1337/api/todos/10
});

//EDITAR UN todo , TENGO Q USAR EL PUT
//url parametrizada en :id porque tengo que identificar el todo a editar
//tengo q usar tb el req.body

router.put("/todos/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const { description } = req.body;
		const baseQuery = "UPDATE todo SET description= $1 WHERE tid= $2";

		await pool.query(baseQuery, [description, id]);
		
		res.json(" your todo was updated!!!").sendStatus(204)
	} catch (err) {
		console.error(err.message);
	}
});

//DELETE UN todo ; uso tambien el id para identificar el todo a borrar
//router.delete
router.delete("/todos/:id", async(req,res)=>{
	try{
		const{id}= req.params;
		const baseQuery = "DELETE FROM todo WHERE tid=$1";
		await pool.query(baseQuery,[id]);
		res.json('todo deleted!!').sendStatus(202)

	}catch(err){
		console.error(err.message)

	}


})

module.exports = router;
