// import { useContext } from "react"
// import { AuthContext } from "../context/authContext"
// import { Navigate} from "react-router-dom"

// export const PrivateRoute = ({child})=>{
//     const {isAuth} = useContext(AuthContext)

//     if(isAuth){
//         return child
//     }else{
//         alert("please login first")
//         return <Navigate to='signin' />
//     }
// }