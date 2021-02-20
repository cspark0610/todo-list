import React, { Fragment, useState } from "react";
import axios from 'axios'

//tengo que recibir como prop a { todo } desde <EditTodo todo={todo} />
//voy a tener q usar description como variable de estado e ir modificandola

const EditTodo = ({ todo }) => {
	const [description, setDescription] = useState(todo.description);

    const updateDescription = async(e) => {
		e.preventDefault();
		try {
			const body = { description };
            //console.log(body);
            //FIJARSE BIEN LA RUTA
			const res = await axios.put(`http://localhost:1337/api/todos/${todo.tid}`, body);
			
            console.log(res);

			window.location = "/"; //refrescar la pagina par ver los cambios sin q lo haga el ususario
		} catch (err) {
			console.error(err.message);
		}
	};

	return (
		<Fragment>
		<button type='button' className='btn btn-warning' data-toggle='modal' 
            data-target={`#id${todo.tid}`} >Edit </button>

			{/* <!-- Modal --> tengo q igualar data-target='#id5' con div id='id5'  */}

			<div id={`id${todo.tid}`} className='modal fade' role='dialog'>
				<div className='modal-dialog'>
					{/* <!-- Modal content--> */}
					<div className='modal-content'>
						<div className='modal-header'>
							<button type='button' className='close' data-dismiss='modal'
                            onClick={() => setDescription(todo.description)}
                            >
                            &times;
							</button>
							<h4 className='modal-title'>Edit Todo</h4>
						</div>
						<div className='modal-body'>
                            {/*aca meto un input form para poder editar el todo */}
							<input 
                                type="text" 
                                className="form-control" 
                                value= { description }
                                onChange = { e => setDescription(e.target.value) }                            
                            />
						</div>
						<div className='modal-footer'>
                             {/*aca hay dos botones uno para editar y otro para el close */}
                            <button type='button' className='btn btn-warning' data-dismiss='modal'
                            onClick={ e =>updateDescription(e) }
                            > Edit Final </button>

							<button type='button' className='btn btn-danger' data-dismiss='modal'>
								Close
							</button>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
};
export default EditTodo;
