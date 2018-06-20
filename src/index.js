import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from './Components/App/App';
import { store } from 'redux/store';
import { Provider } from "react-redux";
import 'font-awesome/css/font-awesome.min.css';

ReactDOM.render(
    <Provider store={store}>
      <AppContainer />
    </Provider>,
    document.getElementById('root')
);
