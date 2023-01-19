import { useHistory } from "react-router-dom";

function RoundedButton(props)
{
    let history=useHistory();
    const onClickHandler=()=>
    {
        history.push(props.site);
    }
    return(
            <button className={props.className} onClick={onClickHandler}>
                {props.text}
            </button>
    );
}
export default RoundedButton;