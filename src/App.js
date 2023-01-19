import './App.css';
import UserRoute from "./components/UserRoute";
import LogIn from "./components/Login";
import RoundedButton from "./components/RoundedButton";
import {Link} from "react-router-dom";
import ico from './images/icon.png';
import {Route, Switch} from "react-router-dom";
import Register from "./components/Register";
import Home from "./components/Home";
import AuthRoute from "./components/AuthRoute";

function App() {
  return (
      <Switch>
        <Route path='/' exact>
          <div className="App">
            <div className="flex-container">
                <div className="card-blue">
                  <img src={ico} className="app-logo" alt="logo"/>
                  <p className={"title"}>Persona Quotes</p>
                  <RoundedButton text='Zaloguj się' className='log-in-button' site='/login'/>
                  <Link to='/register' className={"small-text"}>Nie jesteś użytkownikiem? Zarejestruj
                    się</Link>
                </div>
            </div>

          </div>
        </Route>
        <UserRoute path='/login' component={LogIn}/>
        <UserRoute path='/register' component={Register}/>
        <AuthRoute path='/home' component={Home}/>

      </Switch>
  );
}

export default App;
