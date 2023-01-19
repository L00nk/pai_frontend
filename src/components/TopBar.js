import classes from "./TopBar.module.css";

function TopBar(props)
{
    return(
        <div className={classes.topBar}>
            <div className={classes.flexbox}>
                {props.children}
            </div>
        </div>

    );

}
export default TopBar;