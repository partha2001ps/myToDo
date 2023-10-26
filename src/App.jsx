import React, { useState } from 'react';
import './App.css';

function App() {
  const [todoName, setTodoName] = useState('');
  const [tododes, setTododes] = useState('');
  const [todoes, settodoes] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [filter, setFilter] = useState('All')
  const handleAddTodo = () => {
    if (todoName && tododes) {
      const newTodo = {
        name: todoName,
        des: tododes,
        status: 'Not Completed',
      };
      settodoes([...todoes, newTodo]);
      setTodoName('');
      setTododes('');
    }
  }

  const handleDelete = (index) => {
    const updatedTodos = [...todoes];
    updatedTodos.splice(index, 1);
    settodoes(updatedTodos);
  }

  const handleEdit = (index) => {
    setEditIndex(index);
  }

  const handleSave = (index, newStatus) => {
    const updatedTodos = [...todoes];
    updatedTodos[index].status = newStatus;
    settodoes(updatedTodos);
    setEditIndex(null);
  }
  const filteredTodos = todoes.filter((todo) => {
    if (filter === 'All') return true;
    return todo.status === filter;
  });
  const getBackgroundColor = (status) => {
    if (status === 'Completed') {
      return 'green';
    } else if (status === 'Not Completed') {
      return 'red';
    }
    return 'white';
  };
  return (
    <div>
      <h1 className='text-center text-success'>My Todos</h1>
      <input id='name'
          className='mx-4 mt-4 border border-success'
          placeholder='Todo Name' value={todoName} onChange={(e) => setTodoName(e.target.value)} />
      <input id='description'
          className='mx-4 border border-success'
          placeholder='Todo Description' value={tododes} onChange={(e) => setTododes(e.target.value)} />
      <button  className='mb-2 mx-4 btn btn-success btn btn-primary btn-sm' onClick={handleAddTodo}>Add todo</button>
      <div className="d-flex justify-content-between">
        <h5 className='inline'>My Todos</h5>
        <div className="d-flex align-items-center">
          <h5 className='inline right'>Status Filter:</h5>
          <div className="dropdown inline right">
            <select
              className="form-control"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Completed"  >Completed</option>
              <option value="Not Completed">Not Completed</option>
            </select>
          </div>
        </div>
      </div>
       
      { filteredTodos.map((todo, index) => (
        <div className='card'  id='cardall' key={index}> 
          <div className='card-title'>
            <h2> Name: {todo.name}</h2>
          </div>
          <div className='mt-3 mb-3'>
            <h4>Description: {todo.des}</h4>
          </div>
          <div>
            <label >Status:</label>
            {editIndex === index?(
            <select className="form-control" value={todo.status} onChange={(e)=>handleSave(index,e.target.value)}>
              <option value="NOt Completed">Not Completed</option>
              <option value="Completed">Completed</option>
             </select>
            ):
              (<span style={{background:getBackgroundColor(todo.status)}}>{ todo.status}</span>)}
          </div>
          {editIndex === index ?
            ( <button   className="btn btn-success mt-2" onClick={()=>handleSave(index,todo.status)}>Save</button>): <button className="btn btn-warning mt-2" onClick={()=>handleEdit(index)}>Edit</button>}
          <button  className="btn btn-primary mt-2 mx-2" onClick={() => handleDelete(index)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;
