# BrightPlan Code Challenge
Create a simple single page app where investor will select a risk level, enter their current investment in each category and
show the possible change to do.

## Setup (Mac OS)

### Os setup
Install Node and npm with homebrew:

Install homebrew
``ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"``

install Node and npm
``brew install node``

### Npm Packages to install

Install ReactJs
``npm install react``

Install webpack (global)
``npm install webpack -g``

Install babel:
``npm install babel-loader babel-core babel-preset-es2015 babel-preset-react``

Redux:
``npm install redux redux-promise``

Material UI:
``npm install material-ui``

React tap event:
``npm install react-tap-event-plugin``

Style loader:
``npm install style-loader``

SCSS loader:
``npm install sass-loader``

Chart ReactJs:
``npm install react-chartjs-2 chart.js``

## Launch the app
Three solutions.

1. Use the webpack Hot dev server:
``npm start``
The Hot watcher dev server provides by Webpack allows us to develop with a inline hot reload web server.
The webapp will be available at this address: 127.0.0.1:555
You can update this address / port via the webpack.config.js file

2. Use a standard web server or even launch the ``/build/index.html`` file in your browser:
I already build a version of the app ready to start in the ``build`` folder

3. Build your own version:
``npm run build```
This command will generate the app.js file needed will of the css from the scss files.
You will not need the source files to launch it on a browser via the index.html (files in the src folder). 


## More details

### Main design implementation
I choose to use Material UI for React with Bootstrap.
It allows us to design quickly a prototype focus on User interaction and Bootstrap for a mobile friendly experience.

### Redux
The Redux data structure in this case is simple.
Even with a simple Reducer, I like to split it in two files. 
The first to take the action asked 'PUT / GET / etc...', the second to do the action (action.js). 
It allows a better readability and maintainability of the reducer when it becomes huge.
The goal was to save the current investment and use an arbritrary setting risk array to convert the current investment to 
our predefined Risk plan.
There is five plans, from Very low risk to very High. The percentage are defined arbritrary in our test case.
In a real situation, we will retreive this information from a server and fill the Data via a reducer.
In our case, Redux is more use to push/get the current investment and change the Risk level choose 
via two Reducers.

### Internal Component State
I like to use the internal component State with React to manage local UI/Data State where Redux
isn't really usefull for that.

### Improvement not done 
- Improve main UI/UX
- Refactoring ``addInvest.js`` by splitting it on different components for a better readability and maintainability.

### Issues
Because I wanted to use React-Chartjs-2 who is a react wrapper component of Chart.js andI run some issues.
The uglyfy script that I used with webpack had some issue during the minification where one variavle name was missing.
I tried to resolve it manually but the issue was more depth. 
Because the goal of this code challenge was not to perform a prod version of the app, I just removed the Uglyfy script from webpack.

The final build size is still huge (790Ko) and even if I already applied some? I found interesting to this that all of your node_modules 
are automatically added in the bundle app. 
It's a serious track to follow to improve the final size.