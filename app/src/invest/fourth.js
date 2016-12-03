import React from 'react';
import ReactNative from 'react-native';

const {
  Text,
  View,
  TouchableHighlight,
} = ReactNative;

class fourth extends React.Component{
    constructor(){
        super();
        this.clickInvest = this.clickInvest.bind(this);
    }
    clickInvest(view) {
        this.props.navigator.push({
            id: view
        })
    }
    render(){
        
        return (
            <View>
            <Text>Enter your current investments</Text>
            <TouchableHighlight onPress={() => this.clickInvest('first')}>
                <Text>Tap me to load the next scene</Text>
            </TouchableHighlight>
            </View>
        )
    }
};

export default fourth;