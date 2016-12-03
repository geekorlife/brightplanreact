/**
 * Simple Android native Button Component
 * Style totally manageable
 * @author Pascal Boudier
 * Option:
 * onPress {function} Pass a callback onpress event
 * buttonStyle {Object} Overwritte the button style
 * textStyle {Object} Overwritte the text style
 * upperCase {Boolean} If true, upperCase text
 */

"use strict";

import React from 'react';
import ReactNative from 'react-native';
import { COLOR, Icon } from 'react-native-material-ui';
const {
    Text,
    StyleSheet,
    View,
    Dimensions,
    TouchableHighlight,
    Button,
    TouchableNativeFeedback,
} = ReactNative;


const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
    button:{
        elevation: 4,
        backgroundColor: '#A1A1A1',
        borderRadius: 2,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    textButton:{
        textAlign: 'center',
        color: 'white',
        padding: 8,
        fontWeight: '500',
    }
});

class button extends React.Component {
    constructor() {
        super();
    }

    clickInvest(view) {
        this.props.onPress();
    }

    render() {
        const buttonStyles = [styles.button];
        const textStyles = [styles.textButton];
        let icon = this.props.icon ? <Icon name={this.props.icon} color={'#ffffff'} size={30} /> : null;
        if (this.props.buttonStyle) {
            buttonStyles.push(this.props.buttonStyle);
        }
        if (this.props.textStyle) {
            textStyles.push(this.props.textStyle);
        }
        const labelTxt = this.props.upperCase ? this.props.text.toUpperCase() : this.props.text;
        return (
             <TouchableNativeFeedback rippleDuration={200} 
                        delayPressIn={1} 
                        delayPressOut={1} 
                        Background={TouchableNativeFeedback.Ripple('#000000')}
                        onPress={() => this.clickInvest()}
                    >
                        <View style={buttonStyles}>
                            {icon}
                            <Text style={textStyles}>{labelTxt}</Text>
                        </View>
                    </TouchableNativeFeedback>
        )
    }
};

export default button;