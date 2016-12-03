/**
 * Main Index Component
 */

import React from 'react';
import store from '../reduce/store';

import NavBar from '../navbar/index';
import RiskChoose from './riskChoose';
import AddInvest from './addInvest';
import Fourth from './fourth';
import PieInvest from './pieInvest';
import { itemsTxt } from './defaultState';
import { COLOR, Icon } from 'react-native-material-ui';

import ReactNative from 'react-native';
const {
    Text,
    StyleSheet,
    View,
    Navigator,
    TouchableOpacity,
} = ReactNative;

const styles = StyleSheet.create({
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    textBar: {
        color: '#ffffff',
        fontSize: 15,
        marginTop: 13,
        fontWeight: '500',
        alignSelf: 'flex-end',
        marginRight: 10,
    },
    textBarAlign: {
        color: '#ffffff',
        fontSize: 15,
        marginTop: 20,
        marginRight: 120,
        fontWeight: '500',
        alignSelf: 'flex-end',
    },
    textIcon: {
        paddingTop: 10
    },
    mainView:{
        flex: 1, 
        backgroundColor: '#ffffff', 
        marginTop: 70
    }
});

class Main extends React.Component {
    constructor() {
        super();
        this.riskLevel = ['VERY LOW', 'LOW', 'MEDIUM', 'HIGH', 'VERY HIGH'];
        this.renderScene = this.renderScene.bind(this);
        this.state = {
            currentLevel: 0,
            rendAdd: false
        }
    }

    renderScene(route, navigator) {

        const riskLvl = itemsTxt[store.getState().activeRiskLevel];
        const title = route.id == 'first' ? 'Welcome Kurthat' : 'Risk level: ' + riskLvl;
        const leftElement = route.id == 'first' ? null : "arrow-back";
        const that = this;

        switch (route.id) {
            case 'first':
                return (
                    <View style={styles.mainView}>
                        <RiskChoose navigator={navigator} title="first" />
                    </View>
                );
            case 'second':
                return (
                    <View style={styles.mainView}>
                        <AddInvest navigator={navigator} title="second" />
                    </View>
                );
            case 'third':
                return (
                    <View style={styles.mainView}>
                        <PieInvest navigator={navigator} title="third" />
                    </View>
                );
            case 'fourth':
                return (
                    <Fourth navigator={navigator} />
                )
        }

    }

    render() {
        const that = this;
        const actionRedux = (e) => {
            
            if (typeof e === 'number') {
                store.dispatch(store.dispatchData('CHANGE_RISK_LVL', { lvl: e }));
                that.forceUpdate();
            }
        };
        
        const title = (route) => {
            let riskLvl = itemsTxt[store.getState().activeRiskLevel];

            if (route.id == 'first') {
                return null;
            }
            
            return <Text style={styles.textBarAlign}>Risk level: </Text>;
        };
        const leftElement = (route, navigator) => {
            switch(route.id) {
                case 'first':
                    return <Text style={styles.textBar}>Welcome Krutarth</Text>;
                case 'second':
                    return (
                        <TouchableOpacity onPress={() => navigator.pop()}>
                            <Text style={styles.textIcon}><Icon name="keyboard-arrow-left" color={'#ffffff'} size={30} /></Text>
                        </TouchableOpacity>
                    )
                case 'third':
                    return (
                        <TouchableOpacity onPress={() => navigator.push({id:'first'})}>
                            <Text style={styles.textIcon}><Icon name="keyboard-arrow-left" color={'#ffffff'} size={30} /></Text>
                        </TouchableOpacity>
                    )
            }
            return null;
        };
        const rightElement = (route, navigator) => {
            if (route.id !== 'first') {
                return (
                    <TouchableOpacity>
                        <NavBar actionRedux={actionRedux} navigator={navigator}/>
                    </TouchableOpacity>
                )
            }
            return null;
        };

        return (
            <View style={{ flex: 1, backgroundColor:'#ffffff' }}>
                <Navigator
                    style={{ flex: 1 }}
                    renderScene={this.renderScene}
                    initialRoute={{ id: 'first' }}
                    configureScene={(route) => {
                        if (route.sceneConfig) {
                            return route.sceneConfig;
                        }
                        return Navigator.SceneConfigs.FloatFromRight;
                    } }
                    navigationBar={
                        <Navigator.NavigationBar
                            routeMapper={{
                                LeftButton: (route, navigator) => leftElement(route, navigator),
                                RightButton: (route, navigator) => rightElement(route, navigator),
                                Title: (route) => title(route),
                            }}
                            style={{ backgroundColor: COLOR.blue500, height: 50 }}
                            />
                    }
                    />
            </View>
        )
    }
};

export default Main;