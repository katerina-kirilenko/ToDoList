import React, {Component} from "react";

import AppHeader from "../AppHeader";
import SearchPanel from "../SearchPanel";
import TodoList from "../TodoList";
import ItemStatusFilter from "../ItemStatusFilter";
import ItemAddForm from "../ItemAddForm";

import "./app.css";

export default class App extends Component {
  maxId = 100;

  state = {
    todoData: [
      this.createTodoItem("Learn React"),
      this.createTodoItem("Build App"),
      this.createTodoItem("Drink Cofee"),
    ],
    searchValue: "",
    statusFilter: "all",
  };

  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++,
    };
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);

      const newTodoData = [
        ...todoData.slice(0, idx),
        ...todoData.slice(idx + 1),
      ];
      return {
        todoData: newTodoData,
      };
    });
  };

  addItem = (text) => {
    const newItem = this.createTodoItem(text);

    this.setState(({ todoData }) => {
      const newList = [...todoData, newItem];

      return {
        todoData: newList,
      };
    });
  };

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);
    const oldItem = arr[idx];
    const newItem = {
      ...oldItem,
      [propName]: !oldItem[propName],
    };

    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  }

  onToggleImportant = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, "important"),
      };
    });
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, "done"),
      };
    });
  };

  onSearchFilter = (searchValue) => {
    this.setState({ searchValue });
  };

  search(todoData, searchValue) {
    if (searchValue.length === 0) {
      return todoData;
    }

    return todoData.filter((item) => {
      return item.label.toLowerCase().includes(searchValue.toLowerCase());
    });
  }

  onFilterChange = (statusFilter) => {
    this.setState({ statusFilter });
  };

  filter(items, statusFilter) {
    switch (statusFilter) {
      case "all":
        return items;
      case "active":
        return items.filter((item) => !item.done);
      case "done":
        return items.filter((item) => item.done);
      default:
        return items;
    }
  }

  render() {
    const { todoData, searchValue, statusFilter } = this.state;

    const searchItems = this.search(todoData, searchValue);
    const filterItems = this.filter(searchItems, statusFilter);

    const doneCount = todoData.filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;

    return (
      <div className='todo-app'>
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className='top-panel d-flex'>
          <SearchPanel onSearchFilter={this.onSearchFilter} />
          <ItemStatusFilter
            statusFilter={statusFilter}
            onFilterChange={this.onFilterChange}
          />
        </div>
        <TodoList
          todos={filterItems}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />
        <ItemAddForm onAdd={this.addItem} />
      </div>
    );
  }
};