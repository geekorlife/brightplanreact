require('./addInvest.scss');

import React from 'react';
import store from '../reduce/store';
import FormInput from './formInput';
import RaisedButton from 'material-ui/RaisedButton';
import { Doughnut } from 'react-chartjs-2';
import {chartState, itemsTxt} from './defaultState';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin(); //Material UI Tap event path

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
        this.handleEdit = this.handleEdit.bind(this);
        this.updateData = this.updateData.bind(this);
        this.submitInvest = this.submitInvest.bind(this);

        //Setup the Component state
        this.state = {
            edit: 0,
            error_txt: '',
            amount: 0,
            currentRiskLevel: 0,
            instruction: [],
            data: {
                labels: ['Bonds', 'Stocks', 'Mutual Funds', 'Forex', 'Real Estate'],
                datasets: [Object.assign({}, chartState)]
            },
            adviceData: {
                labels: ['Bonds', 'Stocks', 'Mutual Funds', 'Forex', 'Real Estate'],
                datasets: [Object.assign({}, chartState)]
            }
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

        this.setState({
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

    componentDidUpdate() {
        const storeData = store.getState();
        if (storeData.currentInvestment) {

            let amount = storeData.currentInvestment.map((d) => d.value).reduce((a, b) => a + b);
            let that = this;

            // If local amount different from the Redux store, launch the update
            if (this.state.amount !== amount && amount > 0 || storeData.activeRiskLevel != this.state.currentRiskLevel) {
                this.setState({
                    amount: amount,
                    currentRiskLevel: storeData.activeRiskLevel,
                    edit: 2
                });
                setTimeout(() => {
                    that.updateData();
                }, 0)
            }
        }
    }

    componentDidMount() {
        this.setState({ edit: 1 }); //When component mount, change state to edit mode
    }

    /**
     * Change edit state 
     * Start Jquery anim
     * 
     * @param {any} value
     * 
     * @memberOf addInvest
     */
    handleEdit(value) {
        this.setState({
            edit: value || 1,
            error_txt: ''
        });
        
        //Fire via a setTimeout to be sure that the state is updated before
        setTimeout(function () {
            $('html,body').animate({ scrollTop: $('.investment-input').offset().top });
            $('.nav-bar').css('top', 0);
        }, 0);
    }

    /**
     * Use props form parent to cancel edit mode
     * and go back to the beginning
     * 
     * @memberOf addInvest
     */
    cancelEdit() {
        let that = this;
        $('.chooseRisk').css('display','block');
        
        $('html,body').animate({ scrollTop: $('.investment-input').offset().top},2);

        $('html,body').animate({ scrollTop: $('body').offset().top });
        $('.nav-bar').css('top', -57);

        this.props.handleToggle();

        setTimeout(function () {
            that.setState({ edit: 0 });
        }, 400);
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
     * Main Chart rendering method
     * 
     * @returns
     * 
     * @memberOf addInvest
     */
    rendCharts() {
        const listInvestment = () => {
            let currentInvestment = this.state.data;
            let adviceInvestment = this.state.adviceData;

            let chartData = currentInvestment.datasets[0].data.map((c, i) => {
                return (
                    <tr key={i}>
                        <td className="invest-bold">{currentInvestment.labels[i]}</td>
                        <td>${c}</td>
                        <td>${adviceInvestment.datasets[0].data[i]}</td>
                    </tr>
                )
            });
            return chartData;
        }

        const instruction = () => {
            let txtArray = this.state.instruction.map((t, i) => {
                return (
                    <p key={i}>
                        {t}
                    </p>
                )
            });
            return txtArray;
        }
        
        return (
            <div className="investment-input">
                <div className="row">
                    <div className="col-sm-6">
                        <div className="inner-col">
                            Your current investment
                            <div className="line-white"></div>
                            <Doughnut
                                data={this.state.data}
                                />
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="inner-col">
                            Our advice for a {itemsTxt[this.state.currentRiskLevel].toLowerCase()} risk
                            <div className="line-white"></div>
                            <Doughnut
                                data={this.state.adviceData}
                                />
                        </div>
                    </div>
                    <div className="col-sm-12 investment-advice">
                        <div className="inner-col">
                            We advice you to follow this investment:
                        <div className="line-white"></div>
                            <div className="col-sm-6">
                                <table>
                                    <tbody>
                                        <tr className="invest-bold">
                                            <td></td><td>Current investment</td><td>Our advice</td>
                                        </tr>
                                        {listInvestment()}
                                    </tbody>
                                </table>
                            </div>
                            <div className="col-sm-6 investment-advice">
                                <br />
                                {instruction()}
                            </div>
                        </div>
                    </div>

                </div>
                <RaisedButton
                    label="Back"
                    className="invest-button"
                    labelStyle= {{color:'white'}}
                    backgroundColor="#4dc3f2"
                    onClick={this.cancelEdit}
                    />
                <RaisedButton
                    label="Edit amount"
                    className="invest-button"
                    labelStyle= {{color:'white'}}
                    backgroundColor="#4dc3f2"
                    onClick={() => this.handleEdit(3)}
                    />
            </div>
        )
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
        }
    }

    render() {

        let mainRend = null;
        let classError = this.state.error_txt ? 'error-display' : 'error-hide';

        if (this.state.edit == 0) {
            mainRend = null;
        }
        else if (this.state.edit == 2 && this.state.amount > 0) {
            mainRend = this.rendCharts();
        }
        else {
            mainRend = <FormInput 
            classError={classError} 
            error_txt={this.state.error_txt} 
            cancelEdit={this.cancelEdit}
            submitInvest={this.submitInvest}
            />;
        }

        return (
            <div>
                {mainRend}
            </div>
        )
    }
};

export default addInvest;