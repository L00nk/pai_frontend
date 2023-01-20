import TopBar from "./TopBar";
import classes from "./Profile.module.css";
import {ArrowLeft, IdentificationCard, LockKey, UserCircle} from "phosphor-react";
import RoundedButton from "./RoundedButton";
import {useHistory} from "react-router-dom";
import postContext from "../context/post-context";
import {useContext, useState} from "react";
import PostContext from "../context/post-context";
import axios from "axios";

function Profile()
{
    const postContext=useContext(PostContext);
    const [password, setPassword] = useState('');
    let token=localStorage.getItem('token');
    let history = useHistory();
    function backHandler(){
        history.push('/home')
    }
    function changePassword(event){
        event.preventDefault();

        const pass_info=
            {
                password:password
            }

        axios.put('user/edit',pass_info,{headers: {authorization: "Bearer " + token}}).then(response => {
            console.log(response);
            localStorage.removeItem('token');
            history.push('/');
            history.go(0);
        }).catch(function (error) {
            console.log(error);
        });
    }
    function deleteUser(){
        axios.delete('user/delete',  {headers: {authorization: "Bearer " + token}}).then(response => {
            console.log(response);
            localStorage.removeItem('token');
            history.push('/');
            history.go(0);
        }).catch(function (error) {
            console.log(error);
        });

    }
    return (
        <div>
            <TopBar>
                <div className={classes.icons}>
                    <ArrowLeft className={classes.icon} size={45} onClick={backHandler}/>
                </div>
            </TopBar>

            <div className={classes.container}>
                <div className={classes.darkBox}>

                </div>
                <div className={classes.lightBox}>
                    <div className={classes.title}>
                        Edytuj hasło użytkownika
                    </div>
                    <form className={classes.addForm} onSubmit={changePassword}>
                                <div className={classes.loginInput}>
                                    <input type="password" id='password' required maxLength='40' onChange={e => setPassword(e.target.value)} minLength='4' title="Hasło powinno zawierać od 4 do 40 znaków" placeholder="Nowe hasło"/>
                                </div>
                        <RoundedButton className={classes.button} text='Edytuj'/>
                    </form>
                    <button className={classes.button} onClick={() => { window.confirm( 'Czy na pewno chcesz usunąć użytkownika? Tej akcji nie można cofnąć') && deleteUser(); }}>Usuń użytkownika</button>

                </div>
            </div>
        </div>
    );
}
export default Profile;