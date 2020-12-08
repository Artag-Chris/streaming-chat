import "./Login.css";
import React, { useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import { auth } from "./firebase";



function Login() {
    //useHistory nos permite cambiar el Url
  const history = useHistory();
  const [email, setEmail] = useState ('');
  const [password, setPassword] = useState ('');
  const signIn = e => {
   e.preventDefault();
     auth
         .signInWithEmailAndPassword(email, password)
         .then(auth =>  { history.push('/chatroom')
            }) 
            
                  //some fancy firebase login
         .catch(error => alert(error.message))
  }

   const register = e=> {
       e.preventDefault();
    auth
    .createUserWithEmailAndPassword(email, password)
    // some fancy firebase register
    //aqui se crea el email y el password exitosamente
    .then((auth) =>{
        if(auth){
                history.push('/chatroom')
            }
   })
    .catch(error => alert(error.message))
    }
  return (
        <div className="login">
            <Link to="/">
            <img className="login__logo" src="https://pbs.twimg.com/profile_images/1306295384575221760/G9j2WySx.jpg" alt="" />
            </Link>
            <div className="login__container">
                <h1> Sign-in</h1>
                <form>
                    <h5>E-mail</h5>
                    <input type= "text" value={email} onChange={e => setEmail(e.target.value)} />
                    <h5>Password</h5>
                    <input type= "password" value={password} onChange= {e => setPassword(e.target.value)} />
                    <button type='submit' onClick={signIn}
                     className="login__signInButton">Sign In</button>
                </form>
                <p>esto es una prueba en firebase hecha por
                    scristxyz@gmail.com take a break.
                </p>
                <button onClick={register}
                className="login__registerButton">Crea tu cuenta</button>

            </div>
        </div>
    )
}

export default Login