import React from 'react'
import moment from 'moment/moment';
import { deleteTodoApi, markTodoApi } from '../services/api.js';
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Todo = ({todo, setRefreshList}) => {

    const handleDelete = async () => {
        const result = await deleteTodoApi({
            todo_id: todo._id
        })
        if(result.data.status === 200){
            setRefreshList(new Date())
            toast('Deleted')
        }
        else{
            toast('Failed to delete, please try again!!!')
        }
    }

    const handleMarkTodo = async () => {
        const result = await markTodoApi({
            todo_id: todo._id
        })
        console.log(result);
        if(result.data.status === 200){
            setRefreshList(new Date())
            toast(result.data.message)
        }
        else{
            toast('Failed to Mark, please try again!!!')
        }
    }

  return (
   <>
    <div className="card col-sm-3 mx-3 my-2 alert text-dark border-secondary">
        <ToastContainer />
        <div className={`card-header ${todo.isCompleted ? 'bg-success' : 'bg-danger'}`}>
           {todo.isCompleted ? 'Completed' : 'Not Completed' }
        </div>
        <div className="card-body">
            <h4 className='card-title' style={{textDecoration: todo.isCompleted ? 'line-through' : 'underline' }}>{todo.desc}</h4>
            <p className='card-text border-light card text-center mt-5'>{moment(todo.date).fromNow()}</p>            
        </div>
        <div className="actionButton" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <div className="deleteButton">
               <button style={{background : 'red'}} onClick={handleDelete} >Delete</button>
            </div>
            <div className="markTodo">
                <button style={{background: 'green'}} onClick={handleMarkTodo} >{todo.isCompleted ? 'Mark UnComplete' : "Mark Complete"}</button>
            </div>
        </div>

    </div>
   </>
  )
}

export default Todo