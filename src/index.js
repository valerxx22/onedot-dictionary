import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import DataSetReducer from './reducers/DataSet'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

let store = createStore(
    DataSetReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

const rootElement = document.getElementById('root');

ReactDOM.render(
    <Provider store={ store }>
        <App />
    </Provider>, 
    rootElement
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();