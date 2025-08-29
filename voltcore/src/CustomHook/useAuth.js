import { useState ,useEffect,useContext} from "react"
import { AuthContext } from "../context/AuthContext/AuthContext"
export const useAuth = ()=>{
    const auth =  useContext(AuthContext)
    return auth
}