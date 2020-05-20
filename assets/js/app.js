import React from 'react';
import ReactDom from 'react-dom'

// any CSS you import will output into a single css file (app.css in this case)
import '../css/app.css';

// Need jQuery? Install it with "yarn add jquery", then uncomment to import it.
// import $ from 'jquery';

console.log('Hello ! Welcome to my app !');

function App() {
    return(
        <div className={"App"}>
            <h1>Bonjour bonjour!</h1>
        </div>
    )
}

const rootElement = document.querySelector('#root');
ReactDom.render(<App />, rootElement);