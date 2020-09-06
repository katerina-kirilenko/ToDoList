import React, { Component } from "react";

import "./search-panel.css";

export default class SearchPanel extends Component {
  state = {
    searchValue: ''
  };

  onSearchChange = (e) => {
    const searchValue = e.target.value;
    this.setState({ searchValue });

    this.props.onSearchFilter(searchValue);
  }

  render() {
    return (
      <input
        type='text'
        placeholder='Type here to search'
        className='search-input'
        onChange={this.onSearchChange}
        value={this.state.searchValue}
      />
    );
  }
}
