import { appStorage } from "./storage.service";

let loged = false;

export const authService = {

    LogIn : (user,pass)=>{

        appStorage.setUser(user);
        loged = true;
    
    },
    
    LogOut : ()=>{
        loged = false;
        appStorage.removeUser();
        return loged;
    },
    
    isLoged : ()=>loged||appStorage.getAdmin(),

}
