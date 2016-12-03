"use strict";

import React from 'react';
import store from '../reduce/store';
import FormInput from './formInput';
import AdviceInvest from './adviceInvest';
import {chartState, itemsTxt} from './defaultState';
import {Pie} from 'react-native-pathjs-charts';
import ReactNative from 'react-native';

const {
  Text,
  StyleSheet,
  View,
  ScrollView,
  UIManager,
  Dimensions,
  ListView,
  InteractionManager,
} = ReactNative;
const width = Dimensions.get('window').width;

const labelInvest = ['Bonds', 'Stocks', 'Mutual Funds', 'Forex', 'Real Estate']

/**
 * Main Class of the component 
 * Rend an input form or different charts
 * Send to the reducer the different investment data
 * 
 * @class addInvest
 * @extends {React.Component}
 */
class addInvest extends React.Component {

    constructor() {
        super();

        // Bind different method
        this.cancelEdit = this.cancelEdit.bind(this);
        this.submitInvest = this.submitInvest.bind(this);

        //Setup the Component state
        this.state = {
            edit: 0,
            error_txt: ''
        }
    }

    /**
     * Use props form parent to cancel edit mode
     * and go back to the beginning
     * 
     * @memberOf addInvest
     */
    cancelEdit() {
        this.props.navigator.push({
            id: 'first'
        });
    };

    /**
     * Parent methid for the form child node
     * Update the error text state
     * 
     * @param {any} value
     * 
     * @memberOf addInvest
     */
    editErrorTxt(value) {
        this.setState({ error_txt: value });
    }

    /**
     * Submit event handling
     * 
     * @memberOf addInvest
     */
    submitInvest(value, error){

        if (error) {
            this.setState({ error_txt: 'All values have to be a number' });
        }
        else {
            this.setState({ error_txt: '' });
            store.dispatch(store.dispatchData('ADD_INVEST', { value }));
            this.props.navigator.push({
                id: 'third'
            });
        }
    }

    render() {
        let classError = this.state.error_txt ? 'error-display' : 'error-hide';

        return (
            <View style={{flex: 1}}>
                <FormInput 
                    classError={classError} 
                    error_txt={this.state.error_txt} 
                    cancelEdit={this.cancelEdit}
                    submitInvest={this.submitInvest}
                />
            </View>
        )
    }
};

export default addInvest;