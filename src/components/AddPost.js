import TopBar from "./TopBar";
import classes from './AddPost.module.css'
import {ArrowLeft, LockKey, Plus, SignOut, UserCircle} from "phosphor-react";
import {Link, useHistory} from "react-router-dom";
import RoundedButton from "./RoundedButton";
import {useState} from "react";
import axios from "axios";

function AddPost (){

    const[title, setTitle]=useState('');
    const[content, setContent]=useState('');
    let token=localStorage.getItem('token');
    let history = useHistory();
    function backHandler(){
        history.push('/home')
    }
    function submitHandler(event){
        event.preventDefault()

        const post_info=
            {
                title:title,
                content:content
            }
        console.log(post_info);
        console.log(token);

        axios.post('post/add', post_info, {headers: {authorization: "Bearer " + token}}).then(response => {
            console.log(response);

            history.push('/home');
        }).catch(function (error) {
            console.log(error);
        });


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
                        Dodaj post
                    </div>
                    <form onSubmit={submitHandler} className={classes.addForm}>
                        <div className={classes.loginInput}>
                            <input type="text" id='title' required placeholder="Tytuł" onChange={e=>setTitle(e.target.value)}/>
                        </div>
                        <div className={classes.loginInputText}>
                            <textarea className={classes.desc} id='content'  required placeholder="Treść posta" onChange={e=>setContent(e.target.value)}/>
                        </div>
                        <RoundedButton className={classes.button} text='Dodaj'/>
                    </form>

                </div>
            </div>
        </div>

    );
}
export default AddPost;