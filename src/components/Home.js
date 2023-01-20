import {useHistory} from "react-router-dom";
import classes from './Home.module.css'
import {MagnifyingGlass, Plus, SignOut, UserCircle} from "phosphor-react";
import TopBar from "./TopBar";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import Loader from "./helpers/Loader";
import ChatItem from "./ChatItem";
import PostContext from "../context/post-context";
import Post from "./Post";
import RoundedButton from "./RoundedButton";

function Home() {

    const postContext=useContext(PostContext);
    const [isLoading, setIsLoading] = useState(false);
    const [date, setDate] = useState('');
    const[posts, setPosts]=useState([])
    let token=localStorage.getItem('token');
    let history = useHistory();

    function profileOnClick() {
        history.push('/profile')

    }
    function addOnClick() {
        history.push('/addPost')
    }

    function logOutHandler()
    {
        localStorage.removeItem('token');
        history.push('/');
        history.go(0);
    }
    function setUser(id,login,email)
    {
        postContext.curUser({
            id:id,
            login:login,
            email:email
        })
    }

    useEffect(() => {
        axios.get('user/get-self', {headers:{authorization : "Bearer "+ token}}).then(response =>{
            console.log(response);
            setUser(response.data.id,response.data.login,response.data.email);

        }).catch (error=>{console.log(error)});

    },[]);
    console.log(postContext.user.id,postContext.user.login,postContext.user.email );

    function getAllUser(){
        axios.get('post/get-all-user', {headers:{authorization : "Bearer "+ token}}).then(response =>{
            console.log(response);
            setPosts(response.data);
            setIsLoading(false);
        }).catch (error=>{console.log(error)});
    }
    function getAll(){
        axios.get('post/get-all', {headers:{authorization : "Bearer "+ token}}).then(response =>{
            console.log(response);
            setPosts(response.data);
            setIsLoading(false);
        }).catch (error=>{console.log(error)});
    }
    function submitHandler(event){
        event.preventDefault()
        axios.get('post/filter-date/'+date, {headers:{authorization : "Bearer "+ token}}).then(response =>{
            console.log(response);
            setPosts(response.data);
            setIsLoading(false);
        }).catch (error=>{console.log(error)});
    }

    if(isLoading)
    {
        return(
            <div>
                <TopBar>
                    <div className={classes.icons}>
                        <SignOut className={classes.icon} size={45} onClick={logOutHandler}/>
                        <Plus className={classes.icon} size={45} onClick={addOnClick}/>
                        <UserCircle className={classes.icon} size={45} onClick={profileOnClick} />
                    </div>
                </TopBar>
                <Loader/>
            </div>
        );
    }
    else if (postContext.infoClicked === false && !isLoading)
    {

        return (

            <div>
                <TopBar>
                    <div className={classes.icons}>
                        <SignOut className={classes.icon} size={45} onClick={logOutHandler}/>
                        <Plus className={classes.icon} size={45} onClick={addOnClick}/>
                        <UserCircle className={classes.icon} size={45} onClick={profileOnClick} />
                    </div>
                </TopBar>

                <div className={classes.container}>
                    <div className={classes.darkBox}>
                            <p className={classes.darkBoxTitle}>Filtruj po dacie utworzenia posta</p>
                            <form className={classes.meetingForm} onSubmit={submitHandler}>
                                <div className={classes.meetingInput}>
                                    <input type="date"
                                           title="Data" id='date'
                                           placeholder="Data utworzenia posta" required onChange={e => setDate(e.target.value)}/>
                                </div>
                                <RoundedButton className={classes.button} text='Filtruj'/>
                            </form>
                            <button className={classes.button1} onClick={getAllUser}>Pokaż wszystkie użytkownika</button>
                            <button className={classes.button2} onClick={getAll}>Pokaż wszystkie</button>
                    </div>
                    <div className={classes.lightBox}>
                        {posts.map(post => <ChatItem key={post.id} id={post.id} dateAndTime={post.date} content={post.content}
                                                     title={post.title} user={post.user.login} uid={post.user.id}/>)}
                    </div>
                </div>
            </div>

        );
    }
    else if (postContext.infoClicked === true && !isLoading)
    {

        return (

            <div>
                <TopBar>
                    <div className={classes.icons}>
                        <SignOut className={classes.icon} size={45} onClick={logOutHandler}/>
                        <Plus className={classes.icon} size={45} onClick={addOnClick}/>
                        <UserCircle className={classes.icon} size={45} onClick={profileOnClick} />
                    </div>
                </TopBar>

                <Post />
            </div>

        );
    }

}

export default Home;