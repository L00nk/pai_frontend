import {createContext,useState} from "react";

const PostContext=createContext({
    post:[],
    infoClicked:'',
    chatClick:(post)=>{},
    chatActive:(postId)=>{},
    infoClick:()=>{}
});

export function PostContextProvider(props)
{
    const[currentPost, setCurrentPost]=useState([]);
    const[infoClicked, setInfoClicked]=useState(false);

    const context={
        post:currentPost,
        infoClicked:infoClicked,
        chatClick:chatClickHandler,
        chatActive:chatIsActiveHandler,
        infoClick:infoClickHandler,
    };

    function chatClickHandler(meeting)
    {
        setCurrentPost((previousPost)=>{
            setInfoClicked(true);
            return meeting;
        });
    }
    function chatIsActiveHandler(postId)
    {
        if(currentPost.id === postId)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    function infoClickHandler()
    {
        if(infoClicked===false)
        {
            setInfoClicked(true);
        }
        else
        {
            setInfoClicked(false);
        }

    }
    return (
        <PostContext.Provider value={context}>
        {props.children}
        </PostContext.Provider>
    );
}
export default PostContext;