import classes from "../components/Comment.module.css";
import {Pencil, Trash} from "phosphor-react";
import {useContext} from "react";
import PostContext from "../context/post-context";
import axios from "axios";
import {useHistory} from "react-router-dom";

function Comment(props)
{
    let token=localStorage.getItem('token');
    let history = useHistory();
    const postContext=useContext(PostContext);
    function deleteComment(){
        axios.delete('comment/delete/'+props.id,  {headers: {authorization: "Bearer " + token}}).then(response => {
            console.log(response);
            history.go(0);
        }).catch(function (error) {
            console.log(error);
        });

    }
    return(
        <div className={classes.commentContainer}>
        <div className={classes.chatInfo}>
            <div className={classes.chatText}>
                <p className={classes.chatFirstMessage}>{props.comment}</p>
                <p className={classes.chatInfoTitle}>{props.user}</p>
            </div>
        </div>
            {props.uid === postContext.user.id &&
                <div className={classes.ico}>
                    <Trash size={30} className={classes.icon} onClick={() => { window.confirm( 'Czy na pewno chcesz usunąć ten komentarz?') && deleteComment(); }} />
                </div>
            }
        </div>


    );
}
export default Comment;