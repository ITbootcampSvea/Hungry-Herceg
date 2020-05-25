import React from 'react'
import { authService } from '../../services/auth.service'
import './Login.css'
import { useAlert } from 'react-alert'
import { logInUser } from '../../services/api.service';


let username = '';
let password = '';

export default function LogIn({ history }) {

    const alert = useAlert()
   

    if (authService.isLoged() && authService.isLoged()!=="Admin") history.push('/home');
    else if (authService.isLoged()) history.push('/settings');

    const handleLogin = (e) => {
        e.preventDefault();
        
        


        logInUser(username, password).then(res => {     
            if (res.data.message === "Success") {   
                const {token,userId,username} = res.data.data;    
                authService.LogIn(username, userId, token);

                if (username === 'Admin') {
                    history.push("/settings");
                }
                else {
                    history.push("/home");
                }
            }
            else {
                alert.error('Wrong username or password!') 
            }
        }).catch(err=>alert.error('Wrong username or password!'));

    }

    const handleUsername = (e) => {
        username = e.target.value
    }

    const handlePassword = (e) => {
        password = e.target.value
    }


    return (
        <div className="Wrappeer">
            <div className="loginCard">
                <img src="./img/hh.png" alt="logo" className='logoPhoto' />
                <div className="loginContent">
                    <h1>Log In</h1>
                    <form onSubmit={handleLogin}>
                        <input type="username" placeholder="Enter username" className="loginIntput" onInput={(e) => handleUsername(e)} required></input>
                        <input type="password" placeholder="Enter password" className="loginIntput" onInput={(e) => handlePassword(e)} required></input>
                        <button type="submit" className="loginBtn"></button>
                    </form>
                </div>
            </div>
        </div>
    )
}