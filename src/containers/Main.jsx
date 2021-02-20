import React, {Fragment} from "react";

import InputTodo from '../components/InputTodo';
import ListTodo from '../components/ListTodo';

//las tags SON EN CAMELCASE SINO NO LAS TOMA

function Main(){

return(
  <Fragment>
    <InputTodo />
    <ListTodo />
  </Fragment>
    
);

}

export default Main;
