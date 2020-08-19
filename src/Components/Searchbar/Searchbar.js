import React from "react";
import "../../scss/Searchbar.scss";
import { AiOutlineSearch } from "react-icons/ai";

function Searchbar(props) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
      />
      <AiOutlineSearch className="search-icon" onClick={props.onClick} />
    </div>
  );
}

export default Searchbar;
