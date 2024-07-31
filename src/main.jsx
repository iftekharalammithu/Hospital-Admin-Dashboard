import React, { createContext, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

export const AuthContext = createContext({ IsAuth: false });

const Appwrapper = () => {
  const [IsAuth, setAuth] = useState(false);
  const [user, setuser] = useState({});
  return (
    <AuthContext.Provider value={{ IsAuth, setAuth, user, setuser }}>
      <App />
    </AuthContext.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Appwrapper />
  </React.StrictMode>
);
