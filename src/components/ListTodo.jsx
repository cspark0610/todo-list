
import React, { Fragment, useState, useEffect } from "react";
import axios from 'axios';
import EditTodo from './EditTodo';

const ListTodo = () => {
    const[todos , setTodos] = useState([]);

    const getTodos = async()=>{
        try{
            const res = await axios.get("http://localhost:1337/api/todos");
            //console.log(res.data);
            
            setTodos(res.data);
            

        }catch(err){
            console.error(err.message)
        }
    }
    useEffect(()=>{
        getTodos();
    },[]);

    //armo una metodo para hacer delete de un todo
    const deleteTodo = async( id ) =>{
        try{
            const deletedTodo = await axios.delete(`http://localhost:1337/api/todos/${id}`);
            // con fetch FUNCIONA ASI:
            //const deletedTodo = await fetch(`http://localhost:1337/api/todos/${id}`,{method :"DELETE"});
           console.log(deletedTodo);
            
            setTodos(todos.filter(todo => todo.tid !== id));
           // console.log(todos);

        }catch(err){
            console.error(err.message);
        }
    };


	return (
		<Fragment>
			<table className='table mt-5 text-center'>
				<thead>
					<tr>
						<th className='text-center'>Description</th>
						<th className='text-center'>Edit</th>
						<th className='text-center'>Delete</th>
					</tr>
				</thead>
				<tbody>
                {/* aca voy a mapear el array de todos que me venga por el pedido axios	*/}
                { todos.map(todo =>(
                <tr key={todo.tid}>
                    <td>{todo.description}</td>
                    <td> <EditTodo todo={todo} /> </td>

                    <td><button className="btn btn-danger" onClick={()=>deleteTodo(todo.tid)}>
                        Delete</button>
                    </td>
                </tr> 
                )) };
				
				</tbody>
			</table>
		</Fragment>
	);
};
export default ListTodo;
