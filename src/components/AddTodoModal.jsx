import React, {useState} from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createTodoApi } from '../services/api.js';

const AddTodoModal = ({setRefreshList}) => {

    const [todoDesc, setTodoDesc] = useState('');

    const handleTodoSave = async() => {
        console.log(todoDesc);
        if(todoDesc === ''){
            toast('Todo is required')
            return;
        }

        const result = await createTodoApi({desc:todoDesc})
        console.log(result);
        if(result.status === 200 && result.data.status === 200){
            toast('Todo Added');
            setRefreshList(new Date())
            setTodoDesc('');
        }
        else{
            toast(result.data.message);
        }
    }

  return (
    <>
     <div className="modal mt-5" id="exampleModal">
            <div className="modal-dialog" role='document'>
                <div className="modal-content">
                    <div className="modal-header">
                        <div className="modal-title">Add new Todo</div>
                        <button type='button' className='btn-close'
                         data-bs-dismiss="modal"
                         arial-label="close">
                            <span arial-hidden="true"></span>
                         </button>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <textarea name=""  
                            className='form-control' 
                            onChange={(e)=>{setTodoDesc(e.target.value)}}
                            rows={3} 
                            placeholder='Write your task...'></textarea>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className='btn btn-secondary' onClick={()=> {setTodoDesc('')}} data-bs-dismiss="modal">Close</button>
                        <button className='btn btn-secondary' onClick={handleTodoSave} data-bs-dismiss="modal" > Save Todo</button>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default AddTodoModal