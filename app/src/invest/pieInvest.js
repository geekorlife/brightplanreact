import React from 'react';
import store from '../reduce/store';
import FormInput from './formInput';
import AdviceInvest from './adviceInvest';
import { chartState, itemsTxt } from './defaultState';
import { Pie } from 'react-native-pathjs-charts';
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
        let txt = 'Remove $' + (currentInvestment[i] - a) + ' from ' + label[i];
        if (a > currentInvestment[i]) {
            txt = 'Add $' + (a - currentInvestment[i]) + ' to ' + label[i];
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

const labelInvest = ['Bonds', 'Stocks', 'Mutual Funds', 'Forex', 'Real Estate'];

const options = {
    width: width / 2,
    height: width / 2,
    center: [width / 4, width / 4],
    color: '#2980B9',
    r: 30,
    R: width / 4.2,
    legendPosition: 'topLeft',
    animate: {
        type: 'oneByOne',
        duration: 200,
        fillTransition: 3
    },
    label: {
        fontFamily: 'Arial',
        fontSize: 8,
        fontWeight: true,
        color: '#ECF0F1'
    }
};

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

        this.amount = 0;

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

    takeData(){
        let data = getData();
        return {
            data: Object.assign(
                { labels: labelInvest},
                { datasets: [data.data] }
            ),
            adviceData: Object.assign(
                { labels: labelInvest},
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
    }

    componentWillUpdate(){
        console.log('Component PIE WILL UPDATEEEE');
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

        const styles = StyleSheet.create({
            title: {
                fontWeight: '500'
            },
            text: {
                justifyContent: 'center',
                flexDirection: 'row',
                flexWrap: 'wrap'
            }
        });

        const instruction = this.state.instruction.map((t, i) => {
            return (<Text key={i}>{t}</Text>)
        });

        const piedata = currentInvestment.datasets[0].data.map((v, i) => {
            return {
                "name": currentInvestment.labels[i],
                "amount": v
            }
        });

        const pieAdvice = adviceInvestment.datasets[0].data.map((v, i) => {
            return {
                "name": currentInvestment.labels[i],
                "amount": v
            }
        });
        let pallete = [
            {'r':25,'g':99,'b':201}, {'r':24,'g':175,'b':35}, 
            {'r':190,'g':31,'b':69}, {'r':100,'g':36,'b':199}, 
            {'r':214,'g':207,'b':32}
        ];
        return (
            <ScrollView>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}>
                    <View>
                        <Text>Your current investment</Text>
                        <Pie data={piedata} pallete={pallete} options={options} accessorKey="amount" />
                    </View>
                    <View>
                        <Text>Advice for a {itemsTxt[this.state.currentRiskLevel].toLowerCase()} risk</Text>
                        <Pie data={pieAdvice} pallete={pallete} options={options} accessorKey="amount" />
                    </View>
                </View>
                <View>
                    <AdviceInvest
                        currentInvestment={currentInvestment.datasets[0].data}
                        adviceInvestment={adviceInvestment.datasets[0].data}
                        />
                    {instruction}
                </View>
            </ScrollView>
        )
    }

    render() {
        let amountval = 0;
        if(this.state && this.state.data && this.state.data.datasets) {
            amountval = this.state.data.datasets[0].data.reduce((a, b) => {
                return a + b;
            });
        }
        
        let rnd = this.rendCharts;
        if(amountval < 6) {
            rnd = () => (
                <View>
                    <Text style={{textAlign:'center',fontWeight:'500', fontSize :20, marginTop:30}}>
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