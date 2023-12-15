import React, { useState , useEffect} from 'react'
import Header from './Header.jsx'
import Todo from './Todo.jsx'
import { getToken } from '../services/api.js'
import { useNavigate } from 'react-router-dom'
import { getTodoListApi } from '../services/api.js'
import AddTodoModal from './AddTodoModal.jsx'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const navigation = useNavigate();

  const [searchText, setSearchText] = useState("")
  const [list, setList] = useState([]);
  const [refreshList, setRefreshList] = useState();
  const [FilteredList, setFilteredList] = useState([]);

  useEffect(() => {
    if(!getToken()){
      navigation("/login");
    }
    fetchTodoList()
  }, [navigation, refreshList]);

  useEffect(() => {
    if(searchText === ''){
      setFilteredList(list)
    }
    else{
      const filter = list.filter(todo => todo.desc.toLowerCase().includes(searchText.toLowerCase().trim()))
      setFilteredList(filter);
    }
  }, [list, searchText])
  
  
   async function fetchTodoList() {
    const result = await getTodoListApi();
    console.log("todolist", result);
    if(result.status === 200 && result.data.status === 200){
      setList(result.data.data.todos.reverse())
    }
  }

  return (
    <>
    <Header searchText={searchText} setSearchText={setSearchText} />
    <ToastContainer />
     <div className="container">
      <div className="row justify-content-md-center mt-4">
        {
          FilteredList.map((todo)=> <Todo todo={todo} key={todo._id} setRefreshList={setRefreshList}/>)
        }
        {
          FilteredList.length === 0 && <div className="notFoundTodos">
            No todos Found !!!
          </div>
        }
      </div>
      </div>
        <div className="" style={{position:'fixed', right:50, bottom:50, zIndex:100}}>
            <button type='button'
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            className='btn btn-outline-light'
            >Add new Todo 
        </button>
        </div>
       <AddTodoModal setRefreshList={setRefreshList} />
    </>
  )
}

export default Home