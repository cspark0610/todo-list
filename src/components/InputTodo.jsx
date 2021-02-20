import React, { Fragment, useState } from "react";
import axios from 'axios';

const InputTodo = () => {
	const [description, setDescription] = useState("");

	const onChange = (e) => setDescription(e.target.value);

	const onSubmit = async (e) => {
		e.preventDefault();
		try {
			const body = { description };
			//console.log(body); 
            //body = {description: "ir a nadar"}            
			//cuando haga submit voy a hacer un pedido POST con axios api
			//A LA URL 1337/api/todos
			if(body.description){
				const response = await axios.post("http://localhost:1337/api/todos", body );

				console.log(response);
				setDescription('') 
				//para que el input se vacie una vez q submiteo
				window.location = '/';
				//para no tener que estar refrescando la pagina una vez q submiteo y quiera ver el todo agregado
			}
         
		} catch (err) {
			console.error(err.message);
		}
	};
	return (
	<Fragment>
		<h1 className='text-center mt-5'>TODOLIST</h1>
			
			 <form className='d-flex mt-5' onSubmit={onSubmit}>
				<input
					type='text'
					className='form-control'
					onChange={onChange}
					value={description}
				/>
				<button type='button' className='btn btn-success btn-block' onClick={onSubmit}>
					Add todo
				</button>
			</form> 
	
	</Fragment>
	);
};

export default InputTodo;
