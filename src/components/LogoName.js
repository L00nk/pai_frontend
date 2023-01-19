import classes from './LogoName.module.css'
import ico from '../images/icon.png';
function LogoName (){
    return (
        <div className={classes.container}>
            <img src={ico} className={classes.app_logo} alt="logo"/>
            <p className={classes.logo_name}>Persona Forum</p>
        </div>
    );
}
export default LogoName;