import React from 'react';
import store from '../reduce/store';
import {itemsTxt} from '../invest/defaultState';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
require('./navbar.scss');

const items = [];

for (let i = 0; i < 5; i++ ) {
    let txt = itemsTxt[i];
    items.push(<MenuItem value={i} key={i} primaryText={txt} />);
}

class NavBar extends React.Component {
    constructor() {
        super();
        this.currentValue = 0;
        this.handleSlider = this.handleSlider.bind(this);
        this.state = {
            slider: this.currentValue
        }
    }

    componentDidUpdate() {
        let activeRiskLevel = store.getState().activeRiskLevel,
            that = this;
        if (this.currentValue !== activeRiskLevel) {
            this.currentValue = activeRiskLevel;
            // Need to delay the execution to be sure that the state is already updated
            setTimeout(() => {
                that.setState({ activeRiskLevel: that.currentValue })
            }, 0);
        }
    }

    handleSlider(event, value) {
        store.dispatch(store.dispatchData('CHANGE_RISK_LVL', { lvl: value }));
    }

    render() {
        return (
            <Toolbar className="nav-bar">
                <ToolbarTitle className="title" text="Welcome Krutarth" />
                <ToolbarGroup className="riskGrp">
                    Risk: 
                    <SelectField
                        value={this.currentValue}
                        onChange={this.handleSlider}
                        className="selectRisk"
                        maxHeight={200}
                        menuStyle={{color:'white'}}
                    >
                        {items}
                    </SelectField>
                </ToolbarGroup>
            </Toolbar>
        )
    }
}

export default NavBar;