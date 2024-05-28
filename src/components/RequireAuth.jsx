import React from 'react'
import { useAuth } from '../providers/AuthProvider'
import { Navigate } from 'react-router-dom'

export const RequireAuth = ({ children }) => {

const auth= useAuth()
console.log(auth.auth);
if(!auth.auth){
    return <Navigate to="/login" />
}

    return children
}
