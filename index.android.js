import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import MainApp from './app/src/invest/index';
import store from './app/src/reduce/store';
import { Provider } from 'react-redux';
import { COLOR, ThemeProvider } from 'react-native-material-ui';

const uiTheme = {
    palette: {
        primaryColor: COLOR.blue500,
    },
    toolbar: {
        container: {
            height: 50,
        },
    },
};

class Main extends Component {
    render() {
        return (
            <ThemeProvider uiTheme={uiTheme}>
                <MainApp />
            </ThemeProvider>
        );
    }
}


export default class Brightplan extends Component {
  
  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('Brightplan', () => Brightplan);
