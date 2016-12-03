import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';


class formInput extends React.Component{
    constructor(){
        super();
        this.submitValue.bind(this);   
    }
    submitValue(){
        //Get value of each input
        const value = [
            { name: 'Bonds', value: Number(this.refs.bonds.getValue()) },
            { name: 'Stocks', value: Number(this.refs.stocks.getValue()) },
            { name: 'Mutual Funds', value: Number(this.refs.funds.getValue()) },
            { name: 'Forex', value: Number(this.refs.forex.getValue()) },
            { name: 'Real Estate', value: Number(this.refs.estate.getValue()) }
        ];
        // Check if a value is NaN
        let error = false;
        for (let i = 0; i < value.length; i++) {
            if (isNaN(value[i].value)) {
                error = true;
                break;
            }
        }
        this.props.submitInvest(value, error);
    }
    render(){
        const styles = {
            floatingLabelStyle: { color: '#4dc3f2' },
            underlineStyle: { borderColor: '#4dc3f2' }
        };
        return (
            <div className="investment-input">
                <h3>Enter your current investments</h3>
                <hr />
                <div className="row">
                    <span className={this.props.classError}>{this.props.error_txt}</span>
                    <div className="col-sm-4">
                        <TextField
                            hintText="Bonds investment"
                            floatingLabelText="Bonds"
                            className="input-invest"
                            floatingLabelFocusStyle={styles.floatingLabelStyle}
                            underlineFocusStyle={styles.underlineStyle}
                            ref='bonds'
                            />
                    </div>
                    <div className="col-sm-4">
                        <TextField
                            hintText="Stocks investment"
                            floatingLabelText="Stocks"
                            className="input-invest"
                            floatingLabelFocusStyle={styles.floatingLabelStyle}
                            underlineFocusStyle={styles.underlineStyle}
                            ref='stocks'
                            />
                    </div>
                    <div className="col-sm-4">
                        <TextField
                            hintText="Mutual Funds investment"
                            floatingLabelText="Mutual Funds"
                            className="input-invest"
                            floatingLabelFocusStyle={styles.floatingLabelStyle}
                            underlineFocusStyle={styles.underlineStyle}
                            ref='funds'
                            />
                    </div>
                    <div className="col-sm-4">
                        <TextField
                            hintText="Forex investment"
                            floatingLabelText="Forex"
                            className="input-invest"
                            floatingLabelFocusStyle={styles.floatingLabelStyle}
                            underlineFocusStyle={styles.underlineStyle}
                            ref='forex'
                            />
                    </div>
                    <div className="col-sm-4">
                        <TextField
                            hintText="Real Estate investment"
                            floatingLabelText="Real Estate"
                            floatingLabelFocusStyle={styles.floatingLabelStyle}
                            underlineFocusStyle={styles.underlineStyle}
                            className="input-invest"
                            ref='estate'
                            />
                    </div>
                </div>
                <div>
                    <RaisedButton
                        label="Cancel"
                        className="invest-button"
                        labelStyle= {{color:'white'}}
                        backgroundColor="#4dc3f2"
                        onClick={this.props.cancelEdit}
                        />
                    <RaisedButton
                        label="Submit"
                        className="invest-button"
                        labelStyle= {{color:'white'}}
                        backgroundColor="#4dc3f2"
                        onClick={(e) => this.submitValue()}
                        />
                </div>
            </div>
        )
    }
};

export default formInput;