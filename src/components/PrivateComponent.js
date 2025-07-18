import React from "react";
import { Navigate, Outlet } from "react-router-dom";
 

const PrivateComponent=()=>{
const auth = localStorage.getItem('signups');
return auth? <Outlet/> : <Navigate to ="/signup"/>
    return <Outlet/>
} 

export default PrivateComponent