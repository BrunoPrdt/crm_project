import React from 'react';
import ReactDom from 'react-dom'
import {HashRouter} from 'react-router-dom';
import {Switch, Route} from 'react-router'

// any CSS you import will output into a single css file (app.css in this case)
import '../css/app.css';
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import CustomersPage from "./pages/CustomersPage";
import InvoicesPage from "./pages/InvoicesPage";

// Need jQuery? Install it with "yarn add jquery", then uncomment to import it.
// import $ from 'jquery';

console.log('Hello ! Welcome to my app !');

function App() {
    return(
        <HashRouter>
            <Navbar/>
            <main className="container pt-5">
                <Switch>
                    <Route path="/" component={HomePage}/>
                    <Route path="/clients" component={CustomersPage}/>
                    <Route path="/factures" component={InvoicesPage}/>
                    <Route path="" component={NotFound} />
                </Switch>
            </main>
        </HashRouter>
    )
}

const rootElement = document.querySelector('#root');
ReactDom.render(<App />, rootElement);