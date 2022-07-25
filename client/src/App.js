import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import AboutPage from "./pages/AboutPage/AboutPage";
import SubTaskPage from "./pages/SubTaskPage/SubTaskPage";
import TaskPage from "./pages/TaskPage/TaskPage";
import ProjectPage from "./pages/ProjectPage/ProjectPage";
import "./App.css";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/project/:id" component={ProjectPage} />
          <Route path="/project/task/:id" component={TaskPage} />
          <Route path="/project/task/subtask/:id" component={SubTaskPage} />
          <Route path="/about" exact component={AboutPage} />
        </Switch>
      </BrowserRouter>
    </>
  );
}
