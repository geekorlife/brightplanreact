import React from 'react';
import MainApp from './invest/index';
import store from './reduce/store';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const muiTheme = getMuiTheme({
    palette: {
        accent1Color: '#4dc3f2',
        secondary2color: "#4dc3f2"
    },
    slider: {
        selectionColor: "#4dc3f2"
      },
});

/**
 * Main App component
 */
const App = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <MainApp />
  </MuiThemeProvider>
);

/**
 * Subscribe the main rendering function to the store 
 */
//store.subscribe(() => rendering());
