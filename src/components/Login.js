import {useState} from "react";
import {Link, useHistory} from "react-router-dom";
import axios from "axios";
import LogoName from "../components/LogoName";
import RoundedButton from "../components/RoundedButton";
import classes from './LogIn.module.css'
import {LockKey, UserCircle} from "phosphor-react";

function LogIn() {
    const[login, setLogin]=useState('');
    const[password, setPassword]=useState('');
    const[loginStatus, setLoginStatus]=useState('');
    const history=useHistory();

    function submitHandler(event){
        event.preventDefault()

        const login_info=
            {
                login:login,
                password:password
            }

        axios.post('login', login_info).then(response =>{
            console.log(response);
            localStorage.setItem('token',response.data.token);
            history.push('/home');
        }).catch (function(error)
        {
            console.log(error)
            if(error.response.status===401)
            {
                setLoginStatus('Użytkownik o podanych danych nie istnieje');
            }
        });
    }


    return(

        <div>
            <div className='flex-container'>
                    <div className='card-blue'>
                        <LogoName />
                        <p className={classes.login_error}>{loginStatus}</p>
                        <form onSubmit={submitHandler}>
                            <div className={classes.loginInput}>
                                <UserCircle size={48} />
                                <input type="text" id='login' minLength='4' maxLength='40' required placeholder="Login" onChange={e=>setLogin(e.target.value)}/>
                            </div>
                            <div className={classes.loginInput}>
                                <LockKey size={48}/>
                                <input type="password" id='password' maxLength='40' title="Hasło powinno zawierać od 4 do 40 znaków" minLength='4' required placeholder="Hasło" onChange={e=>setPassword(e.target.value)}/>
                            </div>
                            <RoundedButton className={classes.button} text='Zaloguj się'/>
                            <Link to='/register' className={"small-text"}>Nie jesteś użytkownikiem? Zarejestruj się</Link>
                        </form>
                    </div>

            </div>

        </div>

    );
}
export default LogIn;