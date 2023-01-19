import LogoName from "../components/LogoName";
import {useState} from "react";
import {Link, useHistory} from "react-router-dom";
import axios from "axios";
import classes from "./Register.module.css";
import {Calendar,IdentificationCard, LockKey, Phone, UserCircle} from "phosphor-react";
import RoundedButton from "../components/RoundedButton";
function Register(){

    const[email, setEmail]=useState('');
    const[password, setPassword]=useState('');
    const[login, setLogin]=useState('');
    const history=useHistory();

    const[dateValidation, setDateValidation]=useState('');

    function submitHandler(event){
        event.preventDefault()


        const register_info=
            {
                login:login,
                email:email,
                password:password,

            }
            console.log(register_info);


        axios.post('register', register_info).then(response =>{
            console.log(response);
            history.push('/login');
        }).catch (function(error)
        {
            console.log(error)
            if(error.response.status===409)
            {
                setDateValidation('Podany email lub login istnieje już w bazie');
            }
        });



    }
    return(

        <div>

            <div className='flex-container'>
                    <div className='card-blue'>
                        <LogoName />
                        <p className={classes.date_error}>{dateValidation}</p>
                        <form onSubmit={submitHandler}>
                            <div className={classes.loginInput}>
                                <UserCircle size={48} />
                                <input type="email" required maxLength='256' id='email' placeholder="E-mail" onChange={e=>setEmail(e.target.value)}/>
                            </div>
                            <div className={classes.loginInput}>
                                <IdentificationCard size={48}/>
                                <input type="text" id='login' required minLength='4' maxLength='40' title="Nazwa użytkownika powinna zawierać od 4 do 40 znaków" placeholder="Nazwa użytkownika" onChange={e=>setLogin(e.target.value)}/>
                            </div>
                            <div className={classes.loginInput}>
                                <LockKey size={48}/>
                                <input type="password" id='password' required maxLength='40' minLength='4' title="Hasło powinno zawierać od 4 do 40 znaków" placeholder="Hasło" onChange={e=>setPassword(e.target.value)}/>
                            </div>
                            <RoundedButton className={classes.button} text='Zarejestruj się'/>
                        </form>
                        <Link to='/login' className={"small-text"}>Masz już konto? Zaloguj się</Link>
                    </div>
            </div>

        </div>


    );


}

export default Register;