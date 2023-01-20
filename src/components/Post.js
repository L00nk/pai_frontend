import classes from "../components/Post.module.css";
import {useContext, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import axios from "axios";
import Comment from "./Comment";
import {formatDate} from "../functions/functions";
import PostContext from "../context/post-context";
import RoundedButton from "./RoundedButton";
import {Chats, Pencil, Trash} from "phosphor-react";

function Post()
{
    const [comment, setComment] = useState('');
    const postContext=useContext(PostContext);
    const [isLoading, setIsLoading] = useState(true);
    const [isEdit, setIsEdit] = useState(false);
    let token=localStorage.getItem('token');
    let format;
    let date=new Date(postContext.post.dateAndTime);
    date=date.toLocaleString();
    const [title, setTitle] = useState(postContext.post.title);
    const [content, setContent] = useState(postContext.post.content);

    let temp=formatDate(date);
    format=temp.slice(0,10);
    let history = useHistory();

    function returnPosts()
    {
        window.location.reload();
    }
    function setEdit()
    {
        if (isEdit)
        {
            setIsEdit(false);
        }
        else
        {
            setIsEdit(true);
        }
    }
    function deletePost()
    {
        axios.delete('post/delete/'+postContext.post.id,  {headers: {authorization: "Bearer " + token}}).then(response => {
            console.log(response);
            history.go(0);
        }).catch(function (error) {
            console.log(error);
        });

    }
    function editPost(event)
    {
        event.preventDefault();
        const post_info=
            {
                title:title,
                content:content
            }

        axios.put('post/edit/'+postContext.post.id,post_info,{headers: {authorization: "Bearer " + token}}).then(response => {
            console.log(response);
            history.go(0);
        }).catch(function (error) {
            console.log(error);
        });

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
                            <RoundedButton className={classes.button1} onClick = {returnPosts} text='Powrót do postów'/>
                        </form>


                    </div>
                    <div className={classes.lightBox}>
                        <div className={classes.post}>
                            <div>
                            <div className={classes.row}>
                                <p className={classes.postTitle}>{postContext.post.title}</p>
                                <p className={classes.date}>{format}</p>
                            </div>
                                <p className={classes.postContent}>{postContext.post.content}</p>
                            </div>
                            { isEdit &&
                                <div className={classes.editForm}>
                                    <form className={classes.addForm} onSubmit={editPost}>
                                        <div className={classes.loginInput1}>
                                            <input type="text" id='title' required placeholder="Tytuł" minLength={3}
                                                   maxLength={40} title="Tytuł powinien zawierać od 3 do 40 znaków"
                                                   defaultValue={postContext.post.title}
                                                   onChange={e => setTitle(e.target.value)}/>
                                        </div>
                                        <div className={classes.loginInputText}>
                                        <textarea className={classes.desc} id='content' minLength={5} maxLength={200}
                                                  title="Post powinien składać się z 5-200 znaków"
                                                  required defaultValue={postContext.post.content}
                                                  placeholder="Treść posta" onChange={e => setContent(e.target.value)}/>
                                        </div>
                                        <RoundedButton className={classes.button2} text='Edytuj'/>
                                    </form>
                                </div>
                            }
                        </div>
                        {postContext.post.uid === postContext.user.id &&
                        <div className={classes.ico}>
                            <Trash size={30} className={classes.icon} onClick={() => { window.confirm( 'Czy na pewno chcesz usunąć ten post?') && deletePost(); }} />
                            <Pencil size={30} className={classes.icon} onClick={setEdit}/>
                        </div>
                        }
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