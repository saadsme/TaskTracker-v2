import React from 'react'
import {useState, useEffect} from 'react'
import{ FaTrash, FaEdit, FaCheck, FaPlus } from 'react-icons/fa'
import './App.css';

function App() {
  const [todos,setTodos] = useState([]);
  const [todo,setTodo] = useState('');
  const [todoEditing,settodoEditing] = useState(null); //the id of the element ethat we will be editing
  const [editingText, seteditingText] = useState('');

  useEffect(()=>{
    const temp = localStorage.getItem('todos')
    const loadedTodos = JSON.parse(temp)
    if(temp!=="[]"){
      setTodos(loadedTodos)
    }

  },[])

  useEffect(()=>{
    const temp = JSON.stringify(todos)//storing all our todos in a json object called temp
    localStorage.setItem('todos',temp) //saving that temp obj to local storage
  },[todos])

  const handleSubmit = (e) => {
    e.preventDefault()
    const newTodo = {
      id:new Date().getTime(),
      text: todo,
      completed: false,
    }
    setTodos([...todos].concat(newTodo));
    setTodo('')

  }
  const deleteTodo = (id) => {
    const updatedTodos = [...todos.filter((todo)=>todo.id!==id )]
    setTodos(updatedTodos)
  }

  const toggleComplete = (id) => {
    const updatedTodos = [...todos.map((todo) => {
      if(todo.id === id){todo.completed = !todo.completed
      }
      return todo
    })]
    setTodos(updatedTodos)
  }
const editTodo = (id) =>{
  const updatedTodos = [...todos.map((todo) => {
    if(todo.id === id){todo.text = editingText
    }
    return todo
  })]
  setTodos(updatedTodos)
  settodoEditing(null)
  seteditingText("")
}

  return (
    <div className="App">
      <header>
      <h1 className='Title'>Todo List App</h1>
      </header>
      <body>
        <div className='addtask'>
          <form onSubmit={handleSubmit}>
          
            <input className='enter-task' type="text" onChange={(e) => setTodo(e.target.value)} value={todo}/>
            
            <button className='button1' type="submit"><FaPlus/></button>
          </form>
        </div>
        <div className="Tasks">
        {todos.map((todo) => 
            <div key={todo.id} className="TaskBox" >
              {todoEditing===todo.id ? (<input type="text" onChange={(e) => seteditingText(e.target.value)} value={editingText}></input>) 
              : (
                 <div className='TaskName'> 
                    <input type="checkbox" id="todo" name="todo" value="todo" onChange={()=> toggleComplete(todo.id)}checked={todo.completed}>
                      </input>
                      
                      <label for="todo" data-content={todo.text}>
                        {todo.text}</label>
                  </div>
                 )}
              
                <div className='twobuttons'> 
                  <button onClick={() => deleteTodo(todo.id)}><FaTrash/></button>
                  {todoEditing===todo.id ? (<button onClick={() => editTodo(todo.id)}><FaCheck/></button>) : (<button onClick={() => settodoEditing(todo.id)}><FaEdit/></button>)}
                </div>
                
            </div>)}
            </div>
        </body>
        <footer></footer>
    </div>
  );
}

export default App;
