import {useHistory} from "react-router-dom";
import classes from './Home.module.css'
import {MagnifyingGlass, SignOut, UserCircle} from "phosphor-react";
import TopBar from "./TopBar";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import Loader from "./helpers/Loader";
import ChatItem from "./ChatItem";

function Home() {

    const [isLoading, setIsLoading] = useState(true);
    const[posts, setPosts]=useState('')
    let token=localStorage.getItem('token');
    let history = useHistory();

    function profileOnClick() {

    }
    function searchOnClick() {
    }

    function logOutHandler()
    {
        localStorage.removeItem('token');
        history.push('/');
        history.go(0);
    }
    useEffect(() => {
        axios.get('post/get-all', {headers:{authorization : "Bearer "+ token}}).then(response =>{
            console.log(response);
            setPosts(response.data);
            setIsLoading(false);
        }).catch (error=>{console.log(error)});

    },[]);
    if(isLoading)
    {
        return(
            <div>
                <TopBar>
                    <div className={classes.icons}>
                        <SignOut className={classes.icon} size={45} onClick={logOutHandler}/>
                        <MagnifyingGlass className={classes.icon} size={45} onClick={searchOnClick}/>
                        <UserCircle className={classes.icon} size={45} onClick={profileOnClick} />
                    </div>
                </TopBar>
                <Loader/>
            </div>
        );
    }
    else
    {

        return (

            <div>
                <TopBar>
                    <div className={classes.icons}>
                        <SignOut className={classes.icon} size={45} onClick={logOutHandler}/>
                        <MagnifyingGlass className={classes.icon} size={45} onClick={searchOnClick}/>
                        <UserCircle className={classes.icon} size={45} onClick={profileOnClick} />
                    </div>
                </TopBar>

                <div className={classes.container}>
                    <div className={classes.darkBox}>
                    </div>
                    <div className={classes.lightBox}>
                        {posts.map(post => <ChatItem key={post.id} id={post.id} dateAndTime={post.date} content={post.content}
                                                           title={post.title} user={post.id_user}/>)}
                    </div>
                </div>
            </div>

        );
    }

}

export default Home;