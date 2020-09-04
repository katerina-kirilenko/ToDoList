import React from "react";

import "./search-panel.css";

const SearchPanel = () => {
  const searchPlaceholder = "Type here to search";

  return (
    <input
      type='text'
      placeholder={searchPlaceholder}
      className='search-input'
    />
  );
};

export default SearchPanel;
