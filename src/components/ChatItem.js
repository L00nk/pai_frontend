import classes from "../components/ChatItem.module.css";
import {formatDate} from "../functions/functions";
import {Heart} from "phosphor-react";

function ChatItem(props)
{
    let format;
    let date=new Date(props.dateAndTime);
    date=date.toLocaleString();

    let temp=formatDate(date);
    format=temp.slice(0,10);

    return(
        <div className={classes.chatInfo}>
            <div className={classes.chatText}>
                <p className={classes.chatInfoTitle}>{props.content}</p>
                <p className={classes.chatFirstMessage}>~ {props.title}</p>
            </div>
            <div className={classes.date}>
                <p className={classes.dateText}>{format}</p>
                <Heart className={classes.icon} size={32} />
            </div>
        </div>

    );
}
export default ChatItem;