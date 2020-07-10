import React from 'react';
import ReactDom from 'react-dom'
import {HashRouter, Switch, Route} from 'react-router-dom';
import UserContext from "./services/UserContext";

// any CSS you import will output into a single css file (app.css in this case)
import '../css/app.css';
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import CustomersPage from "./pages/CustomersPage";
import InvoicesPage from "./pages/InvoicesPage";
import LoginPage from "./pages/LoginPage";
import {SETUP_APP} from "./services/Config";

// Need jQuery? Install it with "yarn add jquery", then uncomment to import it.
// import $ from 'jquery';

function App() {

    let data = SETUP_APP();
    let userContextValue;

    if (data){
         userContextValue = {
            userData: data,
            updateUserData: console.log(data),
        }
    }

    return(
        <HashRouter>
            <UserContext.Provider value={userContextValue}>
                <Navbar/>
                <main className="container pt-5">
                    <Switch>
                        <Route path="/" exact component={HomePage}/>
                        <Route path="/login" component={LoginPage}/>
                        <Route path="/clients" component={CustomersPage}/>
                        <Route path="/factures" component={InvoicesPage}/>
                        <Route path="" component={NotFound} />
                    </Switch>
                </main>
            </UserContext.Provider>
        </HashRouter>
    )
}

const rootElement = document.querySelector('#root');
ReactDom.render(<App />, rootElement);