import React from 'react';
import store from '../reduce/store';
import { itemsTxt } from '../invest/defaultState';
import ReactNative from 'react-native';
const {
    Text,
    StyleSheet,
    View,
    InteractionManager,
    TouchableHighlight,
    Picker
} = ReactNative;
import { Icon } from 'react-native-material-ui';

import ModalDropdown from 'react-native-modal-dropdown';


const items = [];

for (let i = 0; i < 5; i++) {
    let txt = itemsTxt[i];
    items.push(txt);
}

const styles = StyleSheet.create({
    textIcon: {
        paddingTop: 10
    },
    dropdown_2_row_text: {
        fontSize: 15,
        padding: 10
    }
});

class NavBar extends React.Component {
    constructor() {
        super();
        this.currentValue = store.getState().activeRiskLevel;
        this.state = {
            activeRiskLevel: this.currentValue
        }
    }

    componentDidUpdate() {
        console.log('DID UPDATE NAVBAR ');
        let activeRiskLevel = store.getState().activeRiskLevel,
            that = this;
        if (this.currentValue !== activeRiskLevel) {
            this.currentValue = activeRiskLevel;
            // Need to delay the execution to be sure that the state is already updated
            setTimeout(() => {
                that.setState({ activeRiskLevel: that.currentValue })
            }, 0);
        }
    }

    componentWillUpdate(){
        console.log('WILL UPDATE NAVBAR');
    }

    onSelect(a, b) {
        if (a) {
            this.currentValue = a;
            this.setState({ activeRiskLevel: this.currentValue });
            this.props.actionRedux(Number(a));
        }

    }
    render() {
        let activeRiskLevel = store.getState().activeRiskLevel;
        return (
            <Picker
                    selectedValue={activeRiskLevel.toString()}
                    onValueChange={(a) => this.onSelect(a)}
                    style={{width: 120, color:'white'}}
                    >
                    <Picker.Item label="VERY LOW" value="0" />
                    <Picker.Item label="LOW" value="1" />
                    <Picker.Item label="MEDIUM" value="2" />
                    <Picker.Item label="HIGH" value="3" />
                    <Picker.Item label="VERY HIGH" value="4" />
            </Picker>
        )
    }
}

export default NavBar;