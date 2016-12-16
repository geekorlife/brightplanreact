"use strict";

//require('./riskChoose.scss');
import React from 'react';
import store from '../reduce/store';
import { chartState } from './defaultState';
import ReactNative from 'react-native';
import { COLOR, Icon } from 'react-native-material-ui';
import Button from '../button';
import {PostMessage, StringToData} from './postWebViewMsg';
import SplashScreen from "rn-splash-screen";

const {
    Slider,
    Text,
    StyleSheet,
    View,
    WebView,
    Dimensions,
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

const styles = StyleSheet.create({
    view: {
        flex: 1
    },
    slider: {
        width: width * .9
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: '500',
        margin: 20
    },
    welcome: {
        textAlign: 'center',
        fontSize: 24,
    },
    button:{
        elevation: 1,
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
        this.bindView = null;
    }

    webview = null

    updateData() {
        let data = getData();
        this.currentLevel = data.store.activeRiskLevel;
        let that = this;
        let storeData = store.getState();
        let amount = storeData.currentInvestment.map((d) => d.value).reduce((a, b) => a + b);
        this.setState({
            data: Object.assign(
                {},
                this.state.data,
                { datasets: [data.data] }
            ),
            secondButton: amount > 0
        });
        if (!this.bindView && this.webview) {
            this.bindView = PostMessage(this.webview);
        }
        setTimeout(function(){
            if(that.bindView)
                that.bindView.postMessage(that.state.data.datasets[0].data);
        },0);
        
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

    respondToOnMessage(e){
        console.log('respondToOnMessage',e);
    }

    hideSplash(){
        setTimeout(function(){
            SplashScreen.hide();
        },800);
    }

    render() {
        let dougNut = StringToData(this.state.data.datasets[0].data);
        
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
        
        return (
            <View style={styles.view}>
                <Text style={styles.text}>
                    Current risk: {this.riskLevel[this.currentLevel]}
                </Text>
                <View style={{ flex: 2, alignItems: 'center' }}>
                    <WebView
                        ref={webview => { this.webview = webview; }}
                        style={{
                            backgroundColor: 'white',
                            height: width/1.2,
                            width: width/1.2
                        }}
                        source={{ uri: 'file:///android_asset/chatview.html'}}
                        injectedJavaScript={dougNut}
                        onMessage={this.respondToOnMessage}
                        renderLoading={this.hideSplash()}
                        startInLoadingState
                    />
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
                        text='enter your current investmentsss'
                    />
                    
                    {secondButton()}
                </View>
            </View>
        )
    }
};

export default riskChoose;