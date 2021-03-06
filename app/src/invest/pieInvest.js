import React from 'react';
import store from '../reduce/store';
import FormInput from './formInput';
import AdviceInvest from './adviceInvest';
import { chartState, itemsTxt } from './defaultState';
import { Pie } from 'react-native-pathjs-charts';
import { Card } from 'react-native-material-ui';

import ReactNative from 'react-native';
import { PostMessage, StringToData } from './postWebViewMsg';
const {
    Text,
    StyleSheet,
    View,
    ScrollView,
    Dimensions,
    WebView,
} = ReactNative;
const width = Dimensions.get('window').width;
const WEBVIEW_REF = 'webview';
const WEBVIEW_REF2 = 'webview2';
/**
 * Transform the current Investment Data 
 * from Redux and convert it to fit the risk
 * level selected
 * 
 * return {Object} 
 */
const getData = () => {
    let storeData = store.getState();
    const label = ['Bonds', 'Stocks', 'Mutual Funds', 'Forex', 'Real Estate'];

    //  Get risk level and current investment data
    const riskLvlData = storeData.riskLevel[storeData.activeRiskLevel];
    const currentInvestment = storeData.currentInvestment.map((d) => d.value);

    //  Calcul the total amount invested and convert each category investment
    const amountInvested = currentInvestment.reduce((a, b) => a + b);
    const adviceInvestment = riskLvlData.map((r, i) => {
        return Math.floor(amountInvested / 100 * r); //Avoid floating number
    });

    //  Create investment txt
    const instruction = adviceInvestment.map((a, i) => {
        let txt = (
            <View style={styles.viewTxt} key={i}>
                <Text style={styles.textLeft}>{label[i]} : </Text>
                <Text style={styles.textRight}>Remove $ {(currentInvestment[i] - a)}</Text>
            </View>
        );
        if (a > currentInvestment[i]) {
            txt = (
                <View style={styles.viewTxt} key={i}>
                    <Text style={styles.textLeft}>{label[i]} : </Text>
                    <Text style={styles.textRight}>Add $ {(a - currentInvestment[i])}</Text>
                </View>);
        }
        return txt;
    });

    return {
        data: Object.assign(
            {},
            chartState,
            { data: currentInvestment }
        ),
        adviceData: Object.assign(
            {},
            chartState,
            { data: adviceInvestment }
        ),
        instruction: instruction
    };
};

/**
 * Main Charts labels
 */
const labelInvest = [
    { label: 'Bonds', color: '#FF6384' },
    { label: 'Stocks', color: '#36A2EB' },
    { label: 'Mutual Funds', color: '#FFCE56' },
    { label: 'Forex', color: '#AF3EDD' },
    { label: 'Real Estate', color: '#00EF1C' }
];

const styles = StyleSheet.create({
    title: {
        fontWeight: '500'
    },
    legend: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    charts: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    webview: {
        backgroundColor: 'white',
        height: width / 2.1,
        width: width / 2.1
    },
    text: {
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    viewCard: {
        backgroundColor: '#eeeeee',
        paddingBottom: 5,
        paddingTop: 5,
        marginLeft: 7,
        marginRight: 7,
        paddingLeft: 5,
        borderRadius: 3
    },
    textCard: {
        
    },
    viewTxt: {
        flexDirection: 'row',
        flex: 1,
    },
    textLeft:{
        flex: 0.4,
        fontWeight: '500',
        textAlign: 'left'
    },
    textRight:{
        flex: 0.6,
        textAlign: 'center'
    }
});

/**
 * Main Class of the component 
 * Rend an input form or different charts
 * Send to the reducer the different investment data
 * 
 * @class addInvest
 * @extends {React.Component}
 */
class pieInvest extends React.Component {

    constructor() {
        super();
        this.rendCharts = this.rendCharts.bind(this);

        this.updateData = this.updateData.bind(this);

        let valueDt = this.takeData();

        this.amount = null;

        this.bindView = null;

        //Setup the Component state
        this.state = {
            edit: 0,
            error_txt: '',
            amount: 0,
            currentRiskLevel: store.getState().activeRiskLevel,
            data: valueDt.data,
            adviceData: valueDt.adviceData,
            instruction: valueDt.instruction
        }
    }

    takeData() {
        let data = getData();
        return {
            data: Object.assign(
                { labels: labelInvest.label },
                { datasets: [data.data] }
            ),
            adviceData: Object.assign(
                { labels: labelInvest.label },
                { datasets: [data.adviceData] }
            ),
            instruction: data.instruction
        }
    }

    /**
     * Fire up the update of the local state
     * thanks to the data from the Redux store
     * 
     * @memberOf addInvest
     */
    updateData() {
        let data = getData();
        const storeData = store.getState();
        const that = this;
        this.setState({
            currentRiskLevel: storeData.activeRiskLevel,
            data: Object.assign(
                {},
                this.state.data,
                { datasets: [data.data] }
            ),
            adviceData: Object.assign(
                {},
                this.state.data,
                { datasets: [data.adviceData] }
            ),
            instruction: data.instruction
        });

        if (!this.bindView && this.refs[WEBVIEW_REF2]) {
            this.refs[WEBVIEW_REF2].reload();
            this.bindView = PostMessage(this.refs[WEBVIEW_REF2]);
        }

        setTimeout(function () {
            if (that.bindView)
                that.bindView.postMessage(that.state.adviceData.datasets[0].data);
        }, 0);
    }

    /**
     * On update Component
     * If current investment change, update local state
     */
    componentWillUpdate() {
        const storeData = store.getState();
        if (storeData.currentInvestment) {

            let amount = storeData.currentInvestment.map((d) => d.value).reduce((a, b) => a + b);
            let that = this;
            // If local amount different from the Redux store, launch the update
            if (storeData.activeRiskLevel != this.state.currentRiskLevel) {
                setTimeout(() => {
                    that.updateData();
                }, 0)
            }
        }
    }

    /**
     * Main Chart rendering method
     * 
     * @returns
     * 
     * @memberOf addInvest
     */
    rendCharts() {
        let currentInvestment = this.state.data;

        let adviceInvestment = this.state.adviceData;

        const instruction = this.state.instruction.map((t, i) => {
            return (
                <View style={styles.textCard} key={i}>
                {t}
                </View>)
        });

        let piedata = StringToData(currentInvestment.datasets[0].data);
        let pieAdvice = StringToData(adviceInvestment.datasets[0].data);

        const legend = labelInvest.map((l, i) => {
            const stle = {
                backgrd: {
                    backgroundColor: l.color,
                    width: width / 5,
                    height: 20,
                    borderColor: 'white',
                    borderStyle: 'solid',
                    borderWidth: 1,
                    paddingTop: 2,
                    paddingLeft: 3
                },
                txt: {
                    color: 'white',
                    fontSize: 10
                }

            }
            return (
                <View style={stle.backgrd} key={i}><Text style={stle.txt}>{l.label}</Text></View>
            )
        })
        return (
            <ScrollView>
                <View style={styles.legend}>
                    {legend}
                </View>
                <View style={styles.charts}>
                    <View>
                        <Text>Your current investment</Text>
                        <WebView
                            ref={WEBVIEW_REF}
                            style={styles.webview}
                            source={{ uri: 'file:///android_asset/pierisk.html' }}
                            injectedJavaScript={piedata}
                            onMessage={this.respondToOnMessage}
                            />

                    </View>
                    <View>
                        <Text>Advice for a {itemsTxt[this.state.currentRiskLevel].toLowerCase()}risk</Text>
                        <WebView
                            ref={WEBVIEW_REF2}
                            style={styles.webview}
                            source={{ uri: 'file:///android_asset/pierisk.html' }}
                            injectedJavaScript={pieAdvice}
                            onMessage={this.respondToOnMessage}
                            />
                    </View>
                </View>
                <View>
                    <AdviceInvest
                        currentInvestment={currentInvestment.datasets[0].data}
                        adviceInvestment={adviceInvestment.datasets[0].data}
                        styles={styles.viewCard}
                        />
                    <Text style={{ textAlign: 'center', fontWeight: '600', margin: 10 }}>
                        Investment instructions:
                    </Text>
                    <View style={styles.viewCard}>
                        {instruction}
                    </View>
                </View>
            </ScrollView>
        )
    }

    render() {
        let amountval = 0;
        if (this.state && this.state.data && this.state.data.datasets) {
            amountval = this.state.data.datasets[0].data.reduce((a, b) => {
                return a + b;
            });
        }

        let rnd = this.rendCharts;

        if (amountval < 6) {
            rnd = () => (
                <View>
                    <Text style={{ textAlign: 'center', fontWeight: '500', fontSize: 20, marginTop: 30 }}>
                        Loading...
                    </Text>
                </View>
            )
        }
        return (
            <View style={{ flex: 1 }}>
                {rnd()}
            </View>
        )
    }
};

export default pieInvest;