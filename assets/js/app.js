import React, {useState} from 'react';
import ReactDom from 'react-dom'
import {HashRouter, Switch, Route} from 'react-router-dom';
import UserContext from "./services/UserContext";
import AuthAPI from "./services/AuthAPI";

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

    let userContextValue;
    const [isAuthenticated, setIsAuthenticated] = useState(AuthAPI());
    const [data, setData] = useState(SETUP_APP());

    userContextValue = {
        userData: data,
        updateUserData: setData,
    };

    return(
        <HashRouter>
            <UserContext.Provider value={userContextValue}>
                <Navbar auth={isAuthenticated} onLogout={setIsAuthenticated} />
                <main className="container pt-5">
                    <Switch>
                        <Route path="/" exact
                               render={props => <HomePage auth={isAuthenticated}{...props} />}
                        />
                        <Route path="/login"
                               render={props => <LoginPage onLogin={setIsAuthenticated}{...props} />}
                       />
                        <Route path="/clients" component={CustomersPage} />
                        <Route path="/factures" component={InvoicesPage} />
                        <Route path="" component={NotFound} />
                    </Switch>
                </main>
            </UserContext.Provider>
        </HashRouter>
    )
}

const rootElement = document.querySelector('#root');
ReactDom.render(<App />, rootElement);