import { Route, Routes } from "react-router-dom"
import HomePage from "../Pages/HomePage"
import Signin from "../Pages/Signin"
import Signup from "../Pages/Signup"
import MarvelHeroes from "../Pages/MarvelHeroes"
import AddAvenger from "../Pages/AddAvenger"
import EditMarvel from "../Pages/Edit.Marvel"


export  const MainRoutes = ()=>{
    return (
        <Routes>
            <Route path='/' element={<HomePage/>} ></Route>
            <Route path='/signin' element={<Signin/>} ></Route>
            <Route path='/signup' element={<Signup/>} ></Route>
            <Route path='/marvelheroes' element={<MarvelHeroes/>} ></Route>
            <Route path='/addavenger' element={<AddAvenger/>} ></Route>
            <Route path='/editmarvel/:id' element={<EditMarvel/>} ></Route>
        </Routes>
    )
}