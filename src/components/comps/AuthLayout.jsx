import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Protected({
    children, authentication=true 
}) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [loader, setLoader] = React.useState(true)
    const authStatus = useSelector((state) => state.auth.status)
    useEffect(() => {
        if (authentication && authStatus !== authentication) { 
            navigate('/login')
        }
        if (!authentication && authStatus !== authentication) {
            navigate('/')
        }
        setLoader(false)
    }, [authStatus, authentication, navigate])
    return loader?<h1>Loading</h1>:<>{children}</>
}

export default Protected
