/**
 * Main Index Component
 */

import React from 'react';
import store from '../reduce/store';
import NavBar from '../navbar/index';
import RiskChoose from './riskChoose';
import AddInvest from './AddInvest';

class Main extends React.Component{
    constructor(){
        super();
        this.riskLevel = ['VERY LOW', 'LOW', 'MEDIUM', 'HIGH', 'VERY HIGH'];
        this.startRendInputInvest = this.startRendInputInvest.bind(this);
        this.cancelRendInputInvest = this.cancelRendInputInvest.bind(this);
        this.state = {
            currentLevel: 0,
            rendAdd: false
        }
    }

    /**
     * Parent method to show Current invest 
     * 
     * @memberOf Main
     */
    startRendInputInvest(){
        this.setState({rendAdd: true});
        let that = this;
        setTimeout(function(){
            if(that.state.rendAdd) {
                    $('html,body').animate({scrollTop: $('.investment-input').offset().top});
                    $('.nav-bar').css('top',0);
                    setTimeout(function(){$('.chooseRisk').css('display','none')},400);
                    
            }
        },0);
    }

    /**
     * Parent method to hide Current invest
     * 
     * @memberOf Main
     */
    cancelRendInputInvest(){
        let that = this;
        
        setTimeout(function(){
            that.setState({rendAdd: false});
        },500);
    }

    render(){
        //switch render component - A roteur could be used in this case too
        const rendInputInvest = this.state.rendAdd ? <AddInvest handleToggle={this.cancelRendInputInvest}/> : null;
        
        return(
            <div>
                <NavBar />
                <RiskChoose handleToggle={this.startRendInputInvest}/>
                {rendInputInvest}
            </div>
        )
    }
};

export default Main;