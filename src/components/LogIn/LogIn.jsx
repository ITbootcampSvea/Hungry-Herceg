import React from 'react'
import {authService} from '../../services/auth.service'

let username = '';
let password = '';

export const LogIn = ({history}) => {

    if (authService.isLoged()) history.push('/home');

    const handleLogin = (e) => {
        e.preventDefault();
        console.log(username, password)
        // checkUser(username, password).then(res => {      // Proveriti sa backend-om sta se dobija kao odgovor
        //     if (res.validated) {                         // checkUser - fja za vezu sa serverom

        //         authService.LogIn(username, password);

        //         if (username === 'Admin') {
        //             history.push("/setting");
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
        <form onSubmit={handleLogin}>      
            <input type="username" placeholder="Enter username" onInput={(e) => handleUsername(e)} required></input>
            <input type="password" placeholder="Enter password" onInput={(e) => handlePassword(e)} required></input>
            <button type="submit">Submit</button>
        </form>
    )
}