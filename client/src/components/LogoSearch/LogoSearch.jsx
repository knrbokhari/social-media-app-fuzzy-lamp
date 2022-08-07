import React from "react";
import logo from "../../img/logo.png";
import "./LogoSearch.css";
import { AiOutlineSearch } from "react-icons/ai";

const LogoSearch = () => {
  return (
    <div className="LogoSearch">
      <img src={logo} alt="" style={{ width: "35px", height: "30px" }} />
      <div className="serach">
        <input type="text" name="" placeholder="#Exlpore" />
        <div className="s-icon">
          <AiOutlineSearch style={{ fontSize: "25px" }} />
        </div>
      </div>
    </div>
  );
};

export default LogoSearch;
