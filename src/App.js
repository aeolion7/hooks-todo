import React, { useState, useEffect } from 'react';
import './App.css';

/*
  useState returns two variables:
  The first is the value of the state itself (similar to this.state in a class).
  The second is a function that allows for updating the state (similar to
  this.setState() in a class).
  Array destructuring syntax can help provide access to these variables:
    const [thing, setThing] = useState(defaultThing)
*/

const Todo = ({ todo, index, completeTodo, removeTodo }) => {
  return (
    <div
      style={{ textDecoration: todo.isCompleted ? 'line-through' : '' }}
      className="todo"
    >
      {todo.text}
      <div>
        <button onClick={() => completeTodo(index)}>Complete</button>
        <button onClick={() => removeTodo(index)}>X</button>
      </div>
    </div>
  );
};

const TodoForm = ({ addTodo }) => {
  /*
    On line 39, a local state variable called value is created for the
    form to use with an initial value of an empty string. A variable called
    setValue is also created which allows us to modify the value variable.

    The setValue method is used in the handleSubmit method below, as well as
    in the onChange callback in the <input> tag below.

    For more information, visit https://reactjs.org/docs/hooks-state.html.
  */
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
      isCompleted: true,
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

  const completeTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    setTodos(newTodos);
  };

  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  /*
    The useEffect hook can be thought of as componentDidMount(),
    componentDidUpdate(), and componentWillUnmount() combined.

    For more information, visit https://reactjs.org/docs/hooks-effect.html.
  */

  useEffect(() => {
    document.title = `You have ${todos.length} todos`;
  });

  return (
    <div className="app">
      <div className="todo-list">
        {todos.map((todo, i) => {
          return (
            <Todo
              key={i}
              index={i}
              todo={todo}
              completeTodo={completeTodo}
              removeTodo={removeTodo}
            />
          );
        })}
        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  );
};

export default App;
