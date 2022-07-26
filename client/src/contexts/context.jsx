import { createContext, useState } from "react";

export const todoContext = createContext();

function ContextProvider({ children }) {
  const [projectName, setProjectName] = useState("");
  const [projectId, setProjectId] = useState("");
  return (
    <todoContext.Provider
      value={{
        projectName,
        setProjectName,
        projectId,
        setProjectId,
      }}
    >
      {children}
    </todoContext.Provider>
  );
}

export default ContextProvider;
