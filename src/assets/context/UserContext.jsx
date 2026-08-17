import { createContext, useEffect, useState } from "react";

export let UserContext = createContext("");

export default function UserContextProvider(props) {
  const [userToken, setUserLogin] = useState("");
  const [userName, setUserName] = useState("");
  const [role, setRole] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    if (
      localStorage.getItem("userToken") ||
      localStorage.getItem("userName") ||
      localStorage.getItem("role") ||
      localStorage.getItem("userEmail")
    ) {
      setUserLogin(localStorage.getItem("userToken"));
      setUserName(localStorage.getItem("userName"));
      setRole(localStorage.getItem("role"));
      setUserEmail(localStorage.getItem("userEmail"));
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        userToken,
        setUserLogin,
        setUserEmail,
        userEmail,
        setUserName,
        userName,
        role,
        setRole,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
