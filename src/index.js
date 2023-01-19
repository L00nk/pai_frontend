import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import axios from "axios";
import {PostContextProvider} from "./context/post-context";

axios.defaults.baseURL='http://localhost:8080/';
ReactDOM.render(
    <React.StrictMode>
        <PostContextProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </PostContextProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
