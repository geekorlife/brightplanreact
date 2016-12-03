# BrightPlan Code Challenge
Create a simple Android app with React Native where investor will select a risk level, enter their current investment in each category and
show the possible change to do.

## Setup (Mac OS)

### Basic setup (if not previously done)
Install Node and npm with homebrew:

Install homebrew
``ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"``

install Node and npm
``brew install node``

install React native CLI
``npm install -g react-native-cli``


### Download all dependencies

``npm install``

Link the native vector icon lib and svg
``react-native link react-native-vector-icons``
``react-native link react-native-svg``


## Launch the app

Be sure that one physical device or emulator is connected with this command:
``adb devices``

After, launch the React CLI
``react-native run-android``


## More details

### Main design implementation
As for the Web project, I choose to use Material UI for React.

### Redux
The Redux data structure is exactly the same than the web project. No change was done.

### Code Reuse
Basicaly, the main structure is the same than on the web project. But the UI rendering is totally different.
For exemple, I had to use a static Charts lib where it's animated on the web project or to create my own Button component for Android

### Improvement not done 
- Improve main UI/UX
- Save Previous investments added
- Improve the Charts lib
- Improve Navigation between each view

### Issues
I had some issues and spend a lot of time to do some research. 
Mainly it was about the UI with Android but I had to update my code because the 
lifecycle of React native looks to be different from ReactJS.
