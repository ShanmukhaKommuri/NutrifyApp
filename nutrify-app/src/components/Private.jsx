import { Navigate } from "react-router-dom";
import UserContext from '../contexts/userContext'
import { useContext } from 'react'
export default function Private(props) {
    const loggedData = useContext(UserContext)
    return (
        <>
            {
                loggedData.loggedUser !== null ?
                    <props.Component></props.Component>
                    :
                    <Navigate to='/login'></Navigate>
            }
        </>
    )

}