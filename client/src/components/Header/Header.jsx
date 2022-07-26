import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { RiArrowRightSFill } from "react-icons/ri";
import { todoContext } from "../../contexts/context";
import "./Header.css";

export default function Header() {
  const { projectName, projectId } = useContext(todoContext);
  return (
    <div className="navbar">
      <div className="navbar-links">
        <Link to="/">
          <span>Projects</span>
        </Link>
        {projectName === "" ? "" : <RiArrowRightSFill size={32} />}
        <Link to={`/project/${projectId}`}>
          <span>{projectName === "" ? "" : projectName}</span>
        </Link>
        <Link to="/about">
          <span>About</span>
        </Link>
      </div>
      <div>LOGO</div>
    </div>
  );
}
