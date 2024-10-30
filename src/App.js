import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { BsCheckLg } from 'react-icons/bs';

function App() {
  const [activeTab, setActiveTab] = useState("All");
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [completedTodos, setCompletedTodos] = useState([]);
  const [currentEdit, setCurrentEdit] = useState(null);  // Track the ID of the item being edited
  const [currentEditedItem, setCurrentEditedItem] = useState({ title: "", description: "" });

  // Fetch tasks from the backend
  useEffect(() => {
    axios.get('http://localhost:5000/tasks')
      .then(response => {
        const tasks = response.data;
        const incompleteTasks = tasks.filter(task => task.completed === 'Not Completed');
        const completeTasks = tasks.filter(task => task.completed === 'Completed');

        setTodos(incompleteTasks);
        setCompletedTodos(completeTasks);
      })
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  // Handle adding a new task
  const handleAddTodo = () => {
    const newTodoItem = {
      title: newTitle,
      description: newDescription,
      completed: 'Not Completed'
    };

    axios.post('http://localhost:5000/tasks', newTodoItem)
      .then(response => {
        setTodos([...allTodos, response.data]);
        setNewTitle("");
        setNewDescription("");
      })
      .catch(error => console.error('Error adding task:', error));
  };

  // Handle deleting a task
  const handleDeleteTodo = (id) => {
    axios.delete(`http://localhost:5000/tasks/${id}`)
      .then(() => {
        setTodos(allTodos.filter(todo => todo.id !== id));
        setCompletedTodos(completedTodos.filter(todo => todo.id !== id));
      })
      .catch(error => console.error('Error deleting task:', error));
  };


  // Handle marking a task as completed
  const handleComplete = (id) => {
    const todoToComplete = allTodos.find(todo => todo.id === id);
    
    axios.put(`http://localhost:5000/tasks/${id}`, { ...todoToComplete, completed: 'Completed' })
      .then(() => {
        setTodos(allTodos.filter(todo => todo.id !== id));
        setCompletedTodos([...completedTodos, { ...todoToComplete, completed: 'Completed' }]);
      })
      .catch(error => console.error('Error completing task:', error));
  };

  // Trigger edit mode
  const handleEdit = (id, item) => {
    setCurrentEdit(id); // Set the ID of the item being edited
    setCurrentEditedItem(item); // Set the item to be edited
  };

  // Update the task after editing
  const handleUpdateToDo = () => {
    axios.put(`http://localhost:5000/tasks/${currentEdit}`, currentEditedItem)
      .then(() => {
        // Update the task in allTodos state
        const updatedTodos = allTodos.map(todo => 
          todo.id === currentEdit ? currentEditedItem : todo
        );
        setTodos(updatedTodos);
        setCurrentEdit(null); // Exit edit mode
        setCurrentEditedItem({ title: "", description: "" }); // Clear input fields
      })
      .catch(error => console.error('Error updating task:', error));
  };

  // Combined array for the "All" tab
  const allTasks = [...allTodos, ...completedTodos];

  return (
    <div className="App p-4 bg-black text-white min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-6">My Todos</h1>

      <div className="todo-wrapper bg-gray-800 p-6 w-fit mx-auto mt-8 max-h-[80vh] overflow-y-auto shadow-lg rounded-lg">
      {/* Input fields for new task */}
        <div className="todo-input flex items-center justify-center border-b border-gray-500 pb-6 mb-6">
          <div className="todo-input-item flex flex-col mr-6">
            <label className="font-bold text-white mb-2">Title</label>
            <input 
              type="text" 
              value={newTitle} 
              onChange={(e) => setNewTitle(e.target.value)} 
              placeholder="What's the task title?" 
              className="p-2 w-64 border-none outline-none focus:outline-green-500 text-black"
            />
          </div>

          <div className="todo-input-item flex flex-col mr-6">
            <label className="font-bold text-white mb-2">Description</label>
            <input 
              type="text" 
              value={newDescription} 
              onChange={(e) => setNewDescription(e.target.value)} 
              placeholder="What's the task description?" 
              className="p-2 w-64 border-none outline-none focus:outline-green-500 text-black"
            />
          </div>

          <button 
            type="button" 
            onClick={handleAddTodo} 
            className="bg-green-500 text-white rounded p-2 w-16 mt-8 hover:bg-green-400"
          >
            Add
          </button>
        </div>

        {/* Tab buttons */}
        <div className="btn-area flex space-x-2 mb-4">
          <button 
            className={`py-2 px-4 rounded ${activeTab === 'All' ? 'bg-green-500 text-white' : 'bg-gray-600 text-gray-300'}`} 
            onClick={() => setActiveTab("All")}
          >
            All
          </button>
          <button 
            className={`py-2 px-4 rounded ${activeTab === 'Todo' ? 'bg-green-500 text-white' : 'bg-gray-600 text-gray-300'}`} 
            onClick={() => setActiveTab("Todo")}
          >
            Not Completed
          </button>
          <button 
            className={`py-2 px-4 rounded ${activeTab === 'Completed' ? 'bg-green-500 text-white' : 'bg-gray-600 text-gray-300'}`} 
            onClick={() => setActiveTab("Completed")}
          >
            Completed
          </button>
        </div>

        {/* Task list based on the selected tab */}
        <div className="todo-list space-y-2">
          {activeTab === "All" && allTasks.map((item) => (
            <div key={item.id} className="todo-list-item bg-gray-700 flex justify-between items-center p-4 mb-2 shadow rounded">
              <div>
                <h3 className="text-lg text-green-500 font-bold">{item.title}</h3>
                <p className="text-gray-300">{item.description}</p>
                {item.completed === 'Completed' && (
                  <p className="text-gray-500 text-sm">Completed</p>
                )}
              </div>
            </div>
          ))}

          {activeTab === "Todo" && allTodos.map((item) => (
            <div key={item.id} className="todo-list-item bg-gray-700 flex justify-between items-center p-4 mb-2 shadow rounded">
              {currentEdit === item.id ? (
                <div className="edit_wrapper flex flex-col">
                  <input
                    type="text"
                    value={currentEditedItem.title}
                    onChange={(e) => setCurrentEditedItem({ ...currentEditedItem, title: e.target.value })}
                    className="p-2 mb-2 rounded text-black"
                  />
                  <input
                    type="text"
                    value={currentEditedItem.description}
                    onChange={(e) => setCurrentEditedItem({ ...currentEditedItem, description: e.target.value })}
                    className="p-2 mb-2 rounded text-black"
                  />
                  <button 
                    onClick={handleUpdateToDo}
                    className="bg-blue-500 text-white rounded p-2 mt-2 hover:bg-blue-400"
                  >
                    Update
                  </button>
                </div>
              ) : (
                <div className="flex justify-between w-full">
                  <div>
                    <h3 className="text-lg text-green-500 font-bold">{item.title}</h3>
                    <p className="text-gray-300">{item.description}</p>
                  </div>
                  <div className="flex space-x-2">
                    <AiOutlineDelete className="icon text-red-500 hover:text-red-700 cursor-pointer" onClick={() => handleDeleteTodo(item.id)} title="Delete?" />
                    <BsCheckLg className="check-icon text-green-500 hover:text-green-400 cursor-pointer" onClick={() => handleComplete(item.id)} title="Complete?" />
                    <AiOutlineEdit className="check-icon text-blue-500 hover:text-blue-400 cursor-pointer" onClick={() => handleEdit(item.id, item)} title="Edit?" />
                  </div>
                </div>
              )}
            </div>
          ))}

          {activeTab === "Completed" && completedTodos.map((item) => (
            <div key={item.id} className="todo-list-item bg-gray-700 flex justify-between items-center p-4 mb-2 shadow rounded">
              <div>
                <h3 className="text-lg text-green-500 font-bold">{item.title}</h3>
                <p className="text-gray-300">{item.description}</p>
                <p className="text-gray-500 text-sm">Completed</p>
              </div>
              <div>
                <AiOutlineDelete className="icon text-red-500 hover:text-red-700 cursor-pointer" onClick={() => handleDeleteTodo(item.id)} title="Delete?" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


export default App;
