"use strict";

//require('./riskChoose.scss');
import React from 'react';
import store from '../reduce/store';
import { chartState } from './defaultState';
import { Pie } from 'react-native-pathjs-charts';
import ReactNative from 'react-native';
import { COLOR, Icon } from 'react-native-material-ui';
import Button from '../button';
const {
    Slider,
    Text,
    StyleSheet,
    View,
    ScrollView,
    UIManager,
    Dimensions,
    TouchableHighlight,
    TouchableNativeFeedback,
} = ReactNative;


const getData = () => {
    let storeData = store.getState();
    const riskLvlData = storeData.riskLevel[storeData.activeRiskLevel];

    return {
        data: Object.assign({}, chartState, { data: riskLvlData }),
        store: storeData
    };
};

const width = Dimensions.get('window').width;

const options = {
    width: width/1.2,
    height: width/1.2,
    center: [(width/1.2) / 2, (width/1.2) / 2],
    color: '#2980B9',
    r: 70,
    R: width/1.2 / 2.2,
    legendPosition: 'topLeft',
    animate: {
        type: 'oneByOne',
        duration: 200,
        fillTransition: 3
    },
    label: {
        fontFamily: 'Arial',
        fontSize: 10,
        fontWeight: true,
        color: '#ECF0F1'
    },
    pallete: [{'r':25,'g':99,'b':201}, {'r':24,'g':175,'b':35}, {'r':190,'g':31,'b':69}, {'r':100,'g':36,'b':199}, {'r':214,'g':207,'b':32}, {'r':198,'g':84,'b':45}]
};

const styles = StyleSheet.create({
    view: {
        flex: 1
    },
    slider: {
        width: width * .9
    },
    text: {
        fontSize: 20,
        textAlign: 'left',
        fontWeight: '500',
        margin: 20
    },
    welcome: {
        textAlign: 'center',
        fontSize: 24,
    },
    button:{
        elevation: 4,
        backgroundColor: COLOR.blue500,
        borderRadius: 2,
        width: width*0.9,
        height: 40,
        marginTop:10
    },
    textButton:{
        textAlign: 'center',
        color: 'white',
        padding: 8,
        fontWeight: '500',
    }
});

class riskChoose extends React.Component {
    constructor() {
        super();
        this.riskLevel = ['VERY LOW', 'LOW', 'MEDIUM', 'HIGH', 'VERY HIGH'];
        this.handleSlider = this.handleSlider.bind(this);
        this.updateData = this.updateData.bind(this);

        this.currentLevel = 0;
        this.state = {
            data: {
                labels: ['Bonds', 'Stocks', 'Mutual Funds', 'Forex', 'Real Estate'],
                datasets: [Object.assign({}, chartState)]
            },
            secondButton: false
        };
    }

    updateData() {
        let data = getData();
        this.currentLevel = data.store.activeRiskLevel;
        let that = this;
        let storeData = store.getState();
        let amount = storeData.currentInvestment.map((d) => d.value).reduce((a, b) => a + b);
        that.setState({
            data: Object.assign(
                {},
                that.state.data,
                { datasets: [data.data] }
            ),
            secondButton: amount > 0
        });
    }

    componentWillMount() {
        this.updateData();
    }


    handleSlider(value) {
        const val = Math.round(value);
        store.dispatch(store.dispatchData('CHANGE_RISK_LVL', { lvl: val }));
        let storeData = store.getState();
        if (this.currentLevel !== storeData.activeRiskLevel)
            this.updateData();
    }

    clickInvest(view) {
        this.props.navigator.push({
            id: view
        })
    }

    render() {

        const piedata = this.state.data.datasets[0].data.map((v, i) => {
            return {
                "name": this.state.data.labels[i],
                "amount": v
            }
        });

        const secondButton = () => {
            if(this.state.secondButton) {
                return (
                    <Button 
                        onPress={() => this.clickInvest('third')}
                        buttonStyle={styles.button}
                        textStyle={styles.textButton}
                        upperCase={true}
                        icon="dashboard"
                        text='View your current investments'
                    />
                )
            }
            return null;
        }
        let pallete = [
            {'r':25,'g':99,'b':201}, {'r':24,'g':175,'b':35}, 
            {'r':190,'g':31,'b':69}, {'r':100,'g':36,'b':199}, 
            {'r':214,'g':207,'b':32}
        ];

        return (
            <View style={styles.view}>
                <Text style={styles.text} >
                    Current risk: {this.riskLevel[this.currentLevel]}
                </Text>
                <View style={{ flex: 2, alignItems: 'center' }}>
                    <Pie data={piedata} pallete={pallete} options={options} accessorKey="amount" />
                </View>
                <View style={{ flex: 1, alignItems: 'center', width: width }}>
                    <Slider
                        style={styles.slider}
                        minimumValue={0}
                        maximumValue={4}
                        value={this.currentLevel}
                        onSlidingComplete ={(value) => this.handleSlider(value)}
                        />
                    <Button 
                        onPress={() => this.clickInvest('second')}
                        buttonStyle={styles.button}
                        textStyle={styles.textButton}
                        upperCase={true}
                        icon="description"
                        text='enter your current investments'
                    />
                    
                    {secondButton()}
                </View>
            </View>
        )
    }
};

export default riskChoose;