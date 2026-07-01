import { createContext, useEffect, useState } from "react";

export let UserContext=createContext('');

export default function UserContextProvider(props){
    const [userToken,setUserLogin]=useState('')
   
    useEffect(()=>{
        if (localStorage.getItem('userToken')) {
            setUserLogin(localStorage.getItem('userToken'))
        }
    },[])
    
    return <UserContext.Provider value={{userToken,setUserLogin}}>
        {props.children}
    </UserContext.Provider>
}

