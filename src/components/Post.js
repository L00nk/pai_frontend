import classes from "../components/Post.module.css";
import {useContext, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import axios from "axios";
import Comment from "./Comment";
import {formatDate} from "../functions/functions";
import PostContext from "../context/post-context";
import RoundedButton from "./RoundedButton";
import {Chats} from "phosphor-react";

function Post()
{
    const [comment, setComment] = useState('');
    const postContext=useContext(PostContext);
    const [isLoading, setIsLoading] = useState(true);
    let token=localStorage.getItem('token');
    let format;
    let date=new Date(postContext.post.dateAndTime);
    date=date.toLocaleString();

    let temp=formatDate(date);
    format=temp.slice(0,10);
    let history = useHistory();

    function returnPosts()
    {
        window.location.reload();
    }

    return (
                <div className={classes.container}>
                    <div className={classes.darkBox}>
                        <p className={classes.darkBoxTitle}>Dodaj komentarz</p>
                        <form className={classes.meetingForm}>
                            <div className={classes.meetingInput}>
                                <input type="text" maxLength='50'
                                       title="" id='comment'
                                       placeholder="Komentarz" onChange={e => setComment(e.target.value)}/>
                            </div>
                            <RoundedButton className={classes.button} text='Dodaj'/>
                            <RoundedButton className={classes.button} onClick = {returnPosts} text='Powrót do postów'/>
                        </form>


                    </div>
                    <div className={classes.lightBox}>
                        <div className={classes.post}>
                            <div className={classes.row}>
                                <p className={classes.postTitle}>{postContext.post.title}</p>
                                <p className={classes.date}>{format}</p>
                            </div>
                            <p className={classes.postContent}>{postContext.post.content}</p>
                        </div>
                        <p className={classes.commentHeader}>Komentarze:</p>
                        <div className={classes.comments}>
                            <Comment title = "Tytuł" content = "AAAAAAA"/>
                            <Comment title = "Tytuł" content = "AAAAAAA"/>
                            <Comment title = "Tytuł" content = "AAAAAAA"/>
                            <Comment title = "Tytuł" content = "AAAAAAA"/>

                        </div>

                    </div>
                </div>

        );
   // }

}
export default Post;