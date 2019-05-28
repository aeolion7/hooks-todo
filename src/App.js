import React, { useState } from 'react';
import './App.css';

/*
  useState gives two variables:
  The first is the value of the state itself (similar to this.state in a class).
  The second is a function that allows for updating the state (similar to
  this.setState() in a class).
  const [thing, setThing] = useState(defaultThing)
*/

const Todo = ({ todo, index }) => {
  return <div className="todo">{todo.text}</div>;
};

const TodoForm = ({ addTodo }) => {
  const [value, setValue] = useState('');

  const handleSubmit = evt => {
    evt.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        placeholder="Add new todo..."
        onChange={evt => setValue(evt.target.value)}
      />
    </form>
  );
};

const App = () => {
  const [todos, setTodos] = useState([
    {
      text: 'Learn React Hooks',
      isCompleted: false,
    },
    {
      text: 'Meet friend',
      isCompleted: false,
    },
    {
      text: 'Eat a lot of ramen',
      isCompleted: false,
    },
  ]);

  const addTodo = text => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };

  return (
    <div className="app">
      <div className="todo-list">
        {todos.map((todo, i) => {
          return <Todo key={i} index={i} todo={todo} />;
        })}
        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  );
};

export default App;
