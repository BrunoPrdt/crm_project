import React, {useState} from 'react';
import ReactDom from 'react-dom'
import {HashRouter, Switch, Route, Redirect} from 'react-router-dom';
import UserContext from "./context/UserContext";
// import AuthContext from "./context/AuthContext";
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
import {ProtectedRoute} from "./services/ProtectedRoute";
import CreateAndUpdateCustomerPage from "./pages/CreateAndUpdateCustomerPage";

// Need jQuery? Install it with "yarn add jquery", then uncomment to import it.
// import $ from 'jquery';

function App() {

    let userContextValue, authContextValue;
    const [isAuthenticated, setIsAuthenticated] = useState(AuthAPI());
    const [data, setData] = useState(SETUP_APP());

    authContextValue= {
        isAuthenticated,
        setIsAuthenticated,
    };
    userContextValue = {
        userData: data,
        updateUserData: setData,
    };
//TODO finir d'implémenter le AuthContext => voir pour le multi context
    return(
        <UserContext.Provider value={userContextValue}>
            <HashRouter>
                    <Navbar auth={isAuthenticated} onLogout={setIsAuthenticated} />
                    <main className="container pt-5">
                        <Switch>
                            <Route path="/" exact render={props => <HomePage auth={isAuthenticated}{...props} />} />
                            <Route path="/login" render={props => <LoginPage onLogin={setIsAuthenticated}{...props} />} />
                            <ProtectedRoute path="/clients/:id" auth={isAuthenticated} component={CreateAndUpdateCustomerPage} />
                            <ProtectedRoute path="/clients" auth={isAuthenticated} component={CustomersPage} />
                            <ProtectedRoute path="/factures" auth={isAuthenticated} component={InvoicesPage} />
                            <Route path="" component={NotFound} />
                        </Switch>
                    </main>
            </HashRouter>
        </UserContext.Provider>
    )
}

const rootElement = document.querySelector('#root');
ReactDom.render(<App />, rootElement);