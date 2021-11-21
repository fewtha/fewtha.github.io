import React, { useState, useEffect } from "react";
import TodoDataService from "../services/todo.service";
import { useHistory } from "react-router-dom";

const Todo = props => {
  const history = useHistory();
  const initialTodoState = {
    id: null,
    name: "",
    done: false
  };
  const [currentTodo, setCurrentTodo] = useState(initialTodoState);
  const [message, setMessage] = useState("");

  const getTodo = id => {
    TodoDataService.get(id)
      .then(response => {
        setCurrentTodo(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getTodo(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentTodo({ ...currentTodo, [name]: value });
  };

  const updateDone = status => {
    var data = {
      id: currentTodo.id,
      name: currentTodo.name,
      done: status
    };

    TodoDataService.update(currentTodo.id, data)
      .then(response => {
        setCurrentTodo({ ...currentTodo, published: status });
        console.log(response.data);
        history.push("/");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateTodo = () => {
    TodoDataService.update(currentTodo.id, currentTodo)
      .then(response => {
        console.log(response.data);
        setMessage("The todo was updated successfully!");
        history.push("/");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteTodo = () => {
    TodoDataService.remove(currentTodo.id)
      .then(response => {
        console.log(response.data);
        props.history.push("/todo");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentTodo ? (
        <div className="edit-form">
          <h4>Todo</h4>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={currentTodo.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentTodo.done ? "Done" : "Plan"}
            </div>
          </form>

          {currentTodo.done ? (
            <button
              className="badge bg-primary mr-2"
              onClick={() => updateDone(false)}
            >
              Plan
            </button>
          ) : (
            <button
              className="badge bg-primary mr-2"
              onClick={() => updateDone(true)}
            >
              Done
            </button>
          )}

          <button className="badge bg-danger mr-2" onClick={deleteTodo}>
            Delete
          </button>

          <button
            type="submit"
            className="badge bg-success"
            onClick={updateTodo}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a todo...</p>
        </div>
      )}
    </div>
  );
};

export default Todo;