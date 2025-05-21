import { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import UserContext from '../contexts/userContext'
import { Link } from 'react-router-dom'
export default function Header() {
    const loggedData = useContext(UserContext);
    const navigate = useNavigate();

    function logOut(event) {
        localStorage.removeItem('nutrify-user');
        console.log(loggedData);
        loggedData.setLoggedUser(null);
        navigate('/login');
    }
    return (
        <>
            <ul>
                <Link to='/track'> <li>Track</li></Link>
                <Link to='/diet'><li>Diet</li></Link>
                <li onClick={logOut}>Logout</li>
            </ul>
        </>
    )
}