import React from 'react'
import { useNavigate } from 'react-router-dom'


const RedirectRoute = ({ reditectTo }) => {
    const navigate = useNavigate();
    if (reditectTo) navigate(reditectTo)
}



export default RedirectRoute
