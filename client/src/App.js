import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import AboutPage from "./pages/AboutPage/AboutPage";
import TaskPage from "./pages/TaskPage/TaskPage";
import ProjectPage from "./pages/ProjectPage/ProjectPage";
import ContextProvider from "./contexts/context";
import "./App.css";

export default function App() {
  return (
    <>
      <ContextProvider>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/project/task/:id" component={TaskPage} />
            <Route path="/project/:id" component={ProjectPage} />
            <Route path="/about" exact component={AboutPage} />
          </Switch>
        </BrowserRouter>
      </ContextProvider>
    </>
  );
}
