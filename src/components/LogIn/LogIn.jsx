import React from 'react'
import { authService } from '../../services/auth.service'
import './Login.css'

let username = '';
let password = '';

export default function LogIn({ history }) {

    if (authService.isLoged()) history.push('/home');

    const handleLogin = (e) => {
        e.preventDefault();
        console.log(username, password)
        // checkUser(username, password).then(res => {      // Proveriti sa backend-om sta se dobija kao odgovor
        //     if (res.validated) {                         // checkUser - fja za vezu sa serverom

        //         authService.LogIn(username, password);

        //         if (username === 'Admin') {
        //             history.push("/settings");
        //         }
        //         else {
        //             history.push("/home");
        //         }
        //     }
        //     else {
        //         alert('Username ili password nisu tacani!')       // Da li moze pojedinacna provera na backend-u
        //     }
        // })

    }

    const handleUsername = (e) => {
        username = e.target.value
    }

    const handlePassword = (e) => {
        password = e.target.value
    }


    return (
        <div class="Wrappeer">
            <div class="loginCard">
                <img src="hh.png" alt="logo" class='logoPhoto' />
                <div class="loginContent">
                    <h1>Log In</h1>
                    <form onSubmit={handleLogin}>
                        <input type="username" placeholder="Enter username" class="loginIntput" onInput={(e) => handleUsername(e)} required></input>
                        <input type="password" placeholder="Enter password" class="loginIntput" onInput={(e) => handlePassword(e)} required></input>
                        <button type="submit" class="loginBtn"></button>
                    </form>
                </div>
            </div>
        </div>
    )
}