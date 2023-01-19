import classes from "../components/Comment.module.css";

function Comment(props)
{

    return(
        <div className={classes.chatInfo}>
            <div className={classes.chatText}>
                <p className={classes.chatFirstMessage}>{props.content}</p>
                <p className={classes.chatInfoTitle}>{props.title}</p>
            </div>
        </div>

    );
}
export default Comment;