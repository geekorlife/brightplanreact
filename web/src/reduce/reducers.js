"use strict";

import ActionReduce from './action';
import INITIAL_STATE from './initState';

/**
 * Main reducer
 * Return an immutable state from an action
 */
const actionState = (state = INITIAL_STATE, action) => {
    //Switch action type
    switch (action.type) {

        case 'ADD_INVEST':
            return  ActionReduce.addInvest(state,action.value); // Reducer on enter investment amount

        case 'CHANGE_RISK_LVL':
            return  ActionReduce.changeRiskLevel(state,action.lvl); // Reducer on change risk level

        default:
            return state;
    }
};

export default actionState;