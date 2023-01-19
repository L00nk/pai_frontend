import classes from "./Loader.module.css";

function Loader(){
    return(
        <div className={classes.loadingContainer}>
            <div className={classes.loader}/>
        </div>
    );


}
export default Loader;