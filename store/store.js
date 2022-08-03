import {createStore, combineReducers, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import LanguageReducer from './reducer/languageReducer';

const rootReducer = combineReducers({LanguageReducer});
const composedEnhancer = composeWithDevTools(applyMiddleware(thunk));
export const store = createStore(rootReducer, {}, composedEnhancer);
