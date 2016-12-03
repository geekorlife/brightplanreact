/**
 * Action on reduce
 */

"use strict";

import {updateObject} from './dispatchObj';
import store from './store';

const action = {};

action.changeRiskLevel = (state, lvl) => {
    return updateObject(state, {activeRiskLevel:lvl});
};

action.addInvest = (state, value) => {
    return updateObject(state, {currentInvestment : value});
};

export default action;