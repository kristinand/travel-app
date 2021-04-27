import { applyMiddleware, compose, createStore, Store } from 'redux';
import thunk from 'redux-thunk';
import reducer, { initialState } from './reducers/reducer';
import { ActionsTypes } from './actions/actionsTypes';
import { IState } from './reducers/reducerTypes';

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const temp = window.sessionStorage.getItem('travel-app-state');
const previousState = temp ? JSON.parse(temp) : initialState;

const configureStore = () => createStore(reducer, previousState, composeEnhancers(applyMiddleware(thunk)));

const store: Store<IState, ActionsTypes> = configureStore();

export default store;
