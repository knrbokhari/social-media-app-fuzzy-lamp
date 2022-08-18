import React from "react";
import logo from "../../img/logo.png";
import "./LogoSearch.css";
import { AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";

const LogoSearch = () => {
  return (
    <div className="LogoSearch">
      <Link to="/">
        <img src={logo} alt="" style={{ width: "35px", height: "30px" }} />
      </Link>
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
