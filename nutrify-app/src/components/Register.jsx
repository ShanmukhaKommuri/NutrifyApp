import 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
function Register() {
    const [userDetails, setUserDetails] = useState({
        name: "",
        email: "",
        password: "",
        age: ""
    })

    const [message, setMessage] = useState({
        type: "invisible-msg",
        text: "dummy msg"
    })

    function handleInput(event) {
        setUserDetails((prevState) => {
            return { ...prevState, [event.target.name]: event.target.value }
        })
    }
    function handleSubmit(event) {
        event.preventDefault();
        console.log(userDetails);

        fetch("http://localhost:8000/register", {
            method: "POST",
            body: JSON.stringify(userDetails),
            headers: {
                "content-type": "application/json"
            }
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);

                setMessage(() => {
                    return { type: "success", text: data.message }
                })

                setUserDetails({
                    name: "",
                    email: "",
                    password: "",
                    age: ""
                })

                setTimeout(() => {
                    setMessage({ type: "invisible-msg", text: "dummy msg" })
                }, 2000)
            })
            .catch((err) => {
                console.log("error occured");
            })
    }

    return (
        <>
            <section className='container'>
                <form className='form' onSubmit={handleSubmit}>
                    <h1>Start Ur Fitness</h1>
                    <input className='inp' value={userDetails.name} required type="text" placeholder='Enter name' name="name" id="pass" onChange={handleInput} />
                    <input className='inp' value={userDetails.email} required type="email" placeholder='Enter email' name="email" id="pass" onChange={handleInput} />
                    <input className='inp' value={userDetails.password} required minLength={8} type="password" placeholder='Enter password' name="password" id="pass" onChange={handleInput} />
                    <input className='inp' value={userDetails.age} required min={10} max={100} type="number" placeholder='Enter age' name="age" id="pass" onChange={handleInput} />
                    <button className="btn" >Submit</button>
                    <p>
                        Already Have An Account ? <Link to='/login'>Login</Link>
                    </p>
                    <p className={message.type}>
                        {message.text}
                    </p>
                </form>
            </section>
        </>
    )
}
export default Register