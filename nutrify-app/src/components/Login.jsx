import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useContext } from 'react'
import UserContext from '../contexts/userContext'
function Login() {

    const [userCreds, setUserCreds] = useState({
        email: "",
        password: ""
    })
    const [message, setMessage] = useState({
        type: "invisible-msg",
        text: "not logged in"
    })

    const navigate = useNavigate();

    const loggedInData = useContext(UserContext);

    console.log(loggedInData);
    function handleInput(event) {

        setUserCreds((prevState) => {
            return { ...prevState, [event.target.name]: event.target.value }
        })
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log(userCreds);

        fetch("http://localhost:8000/login", {
            method: "post",
            body: JSON.stringify(userCreds),
            headers: {
                "content-type": "application/json"
            }
        })
            .then((response) => {
                console.log(response)

                if (response.status == 404)
                    setMessage({ type: "error", text: "username or email not found" })

                else if (response.status === 403)
                    setMessage({ type: "error", text: "incorrect password " })

                else
                    return response.json();
                setTimeout(() => {
                    setMessage({
                        type: "invisible-msg",
                        text: "not logged in"
                    })
                }, 2000)

            })
            .then((data) => {
                if (!data) return;
                setMessage({
                    type: "success",
                    text: data.message
                })
                console.log(data);
                setUserCreds({
                    email: "",
                    password: ""
                })

                setTimeout(() => {
                    setMessage({
                        type: "invisible-msg",
                        text: "not logged in"
                    })
                }, 2000)
                console.log(data.token)
                if (data.token != undefined) {
                    console.log('coming')
                    localStorage.setItem("nutrify-user", JSON.stringify(data))
                    loggedInData.setLoggedUser(data)
                    navigate("/track");
                }

            })
            .catch((error) => {
                console.log(error)
            })
    }
    return (
        <>
            <section className='container'>
                <form className='form' onSubmit={handleSubmit}>
                    <h1>Login To Fitness</h1>
                    <input value={userCreds.email} className='inp' type="email"
                        onChange={handleInput} required placeholder='Enter email' name="email" />

                    <input value={userCreds.password} className='inp' type="password"
                        onChange={handleInput} required placeholder='Enter password' name="password" />

                    <button className='btn' >
                        Login
                    </button>
                    <p>
                        Do Not Have An Account ? <Link to='/register'>Register</Link>
                    </p>
                    <p className={message.type}>
                        {message.text}
                    </p>
                </form>
            </section>
        </>
    )
}
export default Login;