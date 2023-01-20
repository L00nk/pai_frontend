import TopBar from "./TopBar";
import classes from "./Profile.module.css";
import {ArrowLeft, IdentificationCard, LockKey, UserCircle} from "phosphor-react";
import RoundedButton from "./RoundedButton";
import {useHistory} from "react-router-dom";

function Profile()
{
    let history = useHistory();
    function backHandler(){
        history.push('/home')
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
                        Edytuj dane użytkownika
                    </div>
                    <form className={classes.addForm}>
                                <div className={classes.loginInput}>
                                    <input type="text" id='login' required minLength='4' maxLength='40' title="Nazwa użytkownika powinna zawierać od 4 do 40 znaków" placeholder="Nazwa użytkownika"/>
                                </div>
                                <div className={classes.loginInput}>
                                    <input type="password" id='password' required maxLength='40' minLength='4' title="Hasło powinno zawierać od 4 do 40 znaków" placeholder="Hasło"/>
                                </div>
                        <RoundedButton className={classes.button} text='Edytuj'/>
                    </form>

                </div>
            </div>
        </div>
    );
}
export default Profile;