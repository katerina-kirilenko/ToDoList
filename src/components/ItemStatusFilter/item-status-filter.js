import React, { Component } from "react";

export default class ItemStatusFilter extends Component {
  buttons = [
    { name: "all", label: "All" },
    { name: "active", label: "Active" },
    { name: "done", label: "Done" },
  ];

  render() {
    const { statusFilter, onFilterChange } = this.props;

    const buttons = this.buttons.map(({ name, label }) => {
      const isActive = statusFilter === name;
      const classNames = isActive ? "btn-info" : "btn-outline-secondary";

      return (
        <button
          type='button'
          className={`btn ${classNames}`}
          onClick={()=> onFilterChange(name)}
          key={name}
        >
          {label}
        </button>
      );
    });

    return (
      <div className='btn-group'>
       {buttons}
      </div>
    );
  }
};
