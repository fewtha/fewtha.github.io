import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route, Link } from "react-router-dom";

import TodoAdd from "./components/todo-add.component";
import Todo from "./components/todo.component";
import TodoList from "./components/todo-list.component";

function App() {
  return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/" className="navbar-brand">
            TODO
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/todo"} className="nav-link">
                Todo
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/todo"]} component={TodoList} />
            <Route exact path="/add" component={TodoAdd} />
            <Route path="/todo/:id" component={Todo} />
          </Switch>
        </div>
      </div>
  );
}

export default App;
