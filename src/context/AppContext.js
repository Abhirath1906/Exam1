import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userName, setUserName] = useState("Abhirath");
  const [selectedMajor, setSelectedMajor] = useState("");

  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme,
        isLoggedIn,
        userName,
        selectedMajor,
        setSelectedMajor,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
