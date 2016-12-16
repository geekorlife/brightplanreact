import React from 'react';
import ReactNative from 'react-native';
import TextField from 'react-native-md-textinput';
import Button from '../button';
import { COLOR } from 'react-native-material-ui';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import { Hoshi } from 'react-native-textinput-effects';

const {
    Slider,
    Text,
    StyleSheet,
    View,
    ScrollView,
    Dimensions,
} = ReactNative;
const width = Dimensions.get('window').width;

class formInput extends React.Component {
    constructor() {
        super();
        this.submitValue = this.submitValue.bind(this);
        this.addValue = this.addValue.bind(this);
        this.rendTextField = this.rendTextField.bind(this);
        this.state = {
            investValue: [
                { name: 'Bonds', value: '' },
                { name: 'Stocks', value: '' },
                { name: 'Mutual Funds', value: '' },
                { name: 'Forex', value: '' },
                { name: 'Real Estate', value: '' }
            ]
        };
    }
    submitValue() {
        // Check if a value is NaN
        let error = false, value = [];
        for (let i = 0; i < this.state.investValue.length; i++) {
            if (isNaN(this.state.investValue[i].value)) {
                error = true;
                break;
            }
        }
        if(!error) {
            value = this.state.investValue.map( (v) => {
                return {'name': v.name, 'value': Number(v.value)}
            })
        }
        this.props.submitInvest(value, error);
    }

    addValue(v, i) {
        const newMap = this.state.investValue.map((val, a) => {
            if (i === a) {
                return { name: val.name, value: v }
            }
            return val;
        })
        this.setState({ investValue: newMap });
    }

    rendTextField(i,txt) {
        const cc = () => console.log('CLICK');
        return (
            <View style={{marginBottom: 15}}>
            
                <Hoshi
                    label={txt}
                    borderColor={'#4dc3f2'}
                    labelStyle={{ color: '#4dc3f2' }}
                    onChangeText={(text) => {
                        this.addValue(text, i);
                    }}
                    onFocus={cc}
                    keyboardType="numeric"
                    iconClass={FontAwesomeIcon}
            iconName={'pencil'}
            iconColor={'white'}
                />
            </View>
        )
    }

    render() {
        const styles = StyleSheet.create({
            floatingLabelStyle: { color: '#4dc3f2' },
            text: {
                textAlign: 'center',
                fontSize: 16,
                fontWeight: '500',
            },
            widthField: {
                width: width * 0.8
            },
            button:{
                elevation: 4,
                backgroundColor: COLOR.blue500,
                borderRadius: 2,
                width: width*0.4,
                marginTop:10
            },
            cancel:{
                backgroundColor: '#DE4331'
            },
            textButton:{
                textAlign: 'center',
                color: 'white',
                padding: 8,
                fontWeight: '500',
            }
        });
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.text}>Enter your current investments</Text>

                <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
                    <Text>{this.props.error_txt}</Text>
                    <View style={styles.widthField}>
                        {this.rendTextField(0, 'Bonds investment')}
                    </View>
                    <View style={styles.widthField}>
                        {this.rendTextField(1, 'Stocks investment')}
                    </View>
                    <View style={styles.widthField}>
                        {this.rendTextField(2, 'Mutual Funds investment')}
                    </View>
                    <View style={styles.widthField}>
                        {this.rendTextField(3, 'Forex investment')}
                    </View>
                    <View style={styles.widthField}>
                        {this.rendTextField(4, 'Real Estate investment')}
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        width: width
                    }}>
                    
                    <Button
                        onPress={this.props.cancelEdit}
                        text="CANCEL"
                        icon="cancel"
                        buttonStyle={[styles.button,styles.cancel]}
                        textStyle={styles.textButton}
                        />
                    <Button 
                        text="SUBMIT"
                        icon="done"
                        onPress={(e) => this.submitValue()}
                        buttonStyle={styles.button}
                        textStyle={styles.textButton}
                        />
                    </View>
                </ScrollView>
            </View>
        )
    }
};

export default formInput;