import { appStorage } from "./storage.service";

let loged = null;

export const authService = {

    LogIn : (user,pass)=>{
        //provera usera

        appStorage.setUser(user);
        loged = user;
    
    },
    
    LogOut : ()=>{
        loged = null;
        appStorage.removeUser();
        return loged;
    },
    
    isLoged : ()=>loged||appStorage.getUser(),

}
