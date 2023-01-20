import classes from "../components/ChatItem.module.css";
import {formatDate} from "../functions/functions";
import {useContext} from "react";
import PostContext from "../context/post-context";

function ChatItem(props)
{
    const postContext=useContext(PostContext);
    let format;
    let date=new Date(props.dateAndTime);
    date=date.toLocaleString();

    let temp=formatDate(date);
    format=temp.slice(0,10);

    function setActive()
    {
        postContext.chatClick({
            id:props.id,
            title:props.title,
            content:props.content,
            dateAndTime:props.dateAndTime,
            user:props.user,
            uid:props.uid
        })
    }

    return(
        <div className={classes.chatInfo} onClick = {setActive}>
            <div className={classes.chatText}>
                <p className={classes.chatInfoTitle}>{props.title}</p>
            </div>
            <div className={classes.date}>
                <p className={classes.dateText}>{format}</p>
            </div>
        </div>

    );
}
export default ChatItem;