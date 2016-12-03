import { createStore, applyMiddleware, compose } from 'redux';
import promise from 'redux-promise';
import reducer from './reducers';
import INITIAL_STATE from './initState';

const finalCreateStore = compose(applyMiddleware(promise),window.devToolsExtension ? window.devToolsExtension() : f => f)(createStore);

const store = finalCreateStore(reducer, INITIAL_STATE);

//Force to clone object on dispacht to avoid mutable data
store.dispatchData = (type, ob) => {
    return Object.assign({ type }, ob)
};

export default store;