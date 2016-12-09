import React from 'react';
import {chartState, itemsTxt} from './defaultState';
import ReactNative from 'react-native';
const {
  Text,
  StyleSheet,
  View,
} = ReactNative;

const labelInvest = ['Bonds', 'Stocks', 'Mutual Funds', 'Forex', 'Real Estate'];
const styles = StyleSheet.create({
    title:{
        fontWeight: '500',
        textAlign: 'center',
        color:'white'
    },
    text: {
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
});
        
class advice extends React.Component{
    constructor(){
        super();
        this.rendAdvice = this.rendAdvice.bind(this);
    }

    rendAdvice(){
        return this.props.currentInvestment.map((v, i) => {
            console.log('this.props.adviceInvestment[i]',this.props.adviceInvestment[i]);
            return (
                <View  key={i} style={{flex:1, flexDirection:'row'}}>
                    <View style={{flex:1}}><Text style={{fontWeight:'500'}}>{labelInvest[i]}</Text></View>
                    <View  style={{flex:1}}><Text style={{textAlign:'center'}}>${v}</Text></View>
                    <View  style={{flex:1}}><Text style={{textAlign:'center'}}>${this.props.adviceInvestment[i]}</Text></View>
                </View>
            )
        });
    }

    render(){
        
        return (
            <View> 

                <Text style={{textAlign :'center', fontWeight: '600',margin:5}}>
                    We advice you to follow this investment:
                </Text>
                <View style={{backgroundColor:'#ffffff',paddingBottom:5,marginLeft:5,marginRight:5,paddingLeft:5,borderRadius:3}}>

                    <View  style={{flexDirection:'row'}}>
                        <View style={{flex:1}}></View>
                        <View  style={{flex:1, justifyContent:'center'}}><Text style={styles.title}>Your amount</Text></View>
                        <View  style={{flex:1, justifyContent:'center'}}><Text style={styles.title}>Our Advices</Text></View>
                    </View>
        
                    {this.rendAdvice()}
                </View>
            </View>
        )
    }
}

export default advice;