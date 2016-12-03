"use strict";

require('./riskChoose.scss');
import React from 'react';
import store from '../reduce/store';
import Slider from 'material-ui/Slider';
import RaisedButton from 'material-ui/RaisedButton';
import { Doughnut } from 'react-chartjs-2';
import {chartState} from './defaultState';



const getData = () => {
    let storeData = store.getState();
    const riskLvlData = storeData.riskLevel[storeData.activeRiskLevel];
    
    return {
        data: Object.assign({},chartState, {data: riskLvlData}),
        store: storeData
    };
};

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
                datasets: [Object.assign({},chartState)]
            }
        }
    }

    updateData(){
        let data = getData();
        this.currentLevel = data.store.activeRiskLevel;
        let that = this;
        
        // Need to delay the execution to be sure that the state is already updated
        setTimeout(() => {
            that.setState({
                data: Object.assign(
                    {},
                    that.state.data,
                    {datasets: [data.data]}
                )
            });
        },0);
    }

    componentDidMount() {
        this.updateData();
    }

    componentDidUpdate(prev,news){
        let storeData = store.getState();

        if(this.currentLevel !== storeData.activeRiskLevel) 
            this.updateData();
    }

    handleSlider(event, value) {
        store.dispatch(store.dispatchData('CHANGE_RISK_LVL', {lvl: value}));
    }

    render() {
        
        return (
            <div className="chooseRisk">
                <h1 className="text-center">WELCOME KRUTARTH</h1>
                <div className="row chooseRisk-col">
                    
                    <div className="col-md-6 slider">
                        <h3>
                            Current risk: <span>{this.riskLevel[this.currentLevel]}</span>
                        </h3>
                        <p>Use the slider to select a risk level</p>
                        <Slider
                            min={0}
                            max={4}
                            step={1}
                            defaultValue={0}
                            value={this.currentLevel}
                            onChange={this.handleSlider}
                            />
                    </div>
                    <div className="col-md-6">
                        <Doughnut 
                            data={this.state.data} 
                        />
                    </div>
                    <div className="col-md-6 button-align">
                        <RaisedButton 
                            label="Enter your current investments" 
                            className="invest-button" 
                            labelStyle= {{color:'white',fontSize:'0.9em'}}
                            backgroundColor="#4dc3f2"
                            onClick={this.props.handleToggle}
                            />
                    </div>
                </div>
                
            </div>
        )
    }
};

export default riskChoose;