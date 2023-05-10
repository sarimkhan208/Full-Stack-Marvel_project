import { createContext, useState } from "react";

export const AuthContext = createContext()

export const AuthContextProvider = ({children})=>{
    const [isAuth , setIsAuth] = useState(false)
    const [username,setUsername] = useState("")

    return <AuthContext.Provider value={{isAuth,setIsAuth,username,setUsername}} >
        {children}
    </AuthContext.Provider>
}