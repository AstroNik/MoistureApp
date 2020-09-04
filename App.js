import React, {Component} from 'react';
import {Provider} from 'react-redux'
import * as firebase from "firebase";
import {getFirebase, ReactReduxFirebaseProvider} from 'react-redux-firebase'
import RootReducer from "./store/Reducer/RootReducer";
import {applyMiddleware, compose, createStore} from "redux";
import thunk from "redux-thunk";
import fbConfig from "./firebase/fbConfig";
import AuthNavigator from "./src/components/Navigators/AuthNavigator";


const store = createStore(RootReducer,
    compose(
        applyMiddleware(thunk.withExtraArgument({getFirebase}))
    )
)

const rrfProps = {
    firebase,
    config: fbConfig,
    dispatch: store.dispatch,
}

class App extends Component {
    render(){
        return (
            <Provider store={store}>
                <ReactReduxFirebaseProvider {...rrfProps}>
                    <AuthNavigator/>
                </ReactReduxFirebaseProvider>
            </Provider>
        );
    }
}

export default App
