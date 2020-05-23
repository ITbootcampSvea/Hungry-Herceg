import React from "react";
import { Link, useHistory } from "react-router-dom";
import './NavBar.css'
import { authService } from "../../services/auth.service";


const NavBar = () =>{
    const history=useHistory()
    return(
        <div className="nav-bar">
            <div className="logo">
                <img src="/img/hh.png" alt="logo" className="logo-icon"/>
            </div>
        <div className="nav-fildes">
        <div></div>
        <div className="nav-filed homeFiled">
            <div className="icon-wrapper">
                <img src="/img/home1.png" alt="icon" className="nav-bar-icon"/>
            </div>
            <div className="nav-text">
                <Link to='/home' className='homeLink'>Home</Link>
            </div>
        </div>
        <div className="nav-filed">
            <div className="icon-wrapper">
                <img src="/img/poll1.png" alt="icon" className="nav-bar-icon"/>
            </div>
            <div className="nav-text rest">
            <Link to='/createpoll'>New Poll</Link>
            </div>
        </div>
        <div className="nav-filed">
            <div className="icon-wrapper">
                <img src="/img/stat1.png" alt="icon" className="nav-bar-icon"/>
            </div>
            <div className="nav-text rest">
            <Link>Stats</Link>
            </div>
        </div>
        <div className="nav-filed rest">
            <div className="icon-wrapper">
                <img src="/img/profile1.png" alt="icon" className="nav-bar-icon"/>
            </div>
            <div className="nav-text rest">
            <Link to='/profile'>Profile</Link>
            </div>
        </div>
        <div className="nav-filed">
            <div className="icon-wrapper">
                <img src="/img/logout2.png" alt="icon" className="nav-bar-icon"/>
            </div>
            <div className="nav-text rest logout">
            <Link onClick={()=>{authService.LogOut();history.push('/login')}} className='logoutLink'>Log Out</Link>
               
            </div>

        </div>
    </div>  
    </div>  
    )
}


export default NavBar