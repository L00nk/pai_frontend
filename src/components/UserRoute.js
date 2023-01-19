import jwtDecode from "jwt-decode";
import {Route,Redirect} from "react-router-dom";

const UserRoute=({component: Component,...rest})=>{

   let isAuthenticated=null;
   let token=localStorage.getItem('token');

    if(token)
    {
        let tokenUsername=jwtDecode(token).sub;
        let tokenExpiration=jwtDecode(token).exp;

        isAuthenticated=true;
        console.log(tokenUsername, tokenExpiration);
    }
    else
    {
        isAuthenticated=false;
    }

    return(
        <Route {...rest} render={props =>
            !isAuthenticated ? (
                <Component {...props}/>
            ) : (
                <Redirect to='/home'/>
            )
        }
        />
    )
}
export default UserRoute;