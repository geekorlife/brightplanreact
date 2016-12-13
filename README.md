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
``react-native link react-native-fs``


## Launch the Native app

Be sure that one physical device or emulator is connected with this command:
``adb devices``

After, launch the React CLI
``react-native run-android``
or 
``npm run android``

### Deploy apk
In the Root folder, run this cmd:

``curl "http://localhost:8081/index.android.bundle?platform=android" -o "android/app/src/main/assets/index.android.bundle"``

Then run this cmd:
``cd android && ./gradlew assembleRelease``

Gradle will create the apk in this folder: ``$ROOT/android/build/outputs/apk/app-release-unsigned.apk``

Be sure that you already have a valid keystore, if not follow this to create one:

``
// To generate keystore
keytool -genkey -v -keystore my-keystore.keystore -alias name_alias -keyalg RSA -validity 10000
``

Then sign the apk:

``
//To sign an apk
jarsigner -verbose -keystore <path of my-keystore.keystore> <path of apk>  alias_name
ex: jarsigner -verbose -keystore brightplan.keystore app/build/outputs/apk/app-release-unsigned.apk  brightplan
``


### Issue know:
Error: ``Execution failed for task ':app:dexDebug'.``

Reason: After linked the both react lib (svg and icons), gradle can need to be cleaned with this command:
``cd android/ && ./gradlew clean``

When the command is done, you can relaunch the react-native build
``cd .. && npm run android``


Error ``Execution failed for task ':app:installDebug'.``

Be sure that your device is connected with a USB cable and that the ``USB Debugging`` is turned ON on your mobile.


Error ``Could not run adb reverse:``

In this case, your are trying to install the debug apk on an Android version less than 5.0 . 
The app is launching but with a red screen and with this message: ''Could not connect to the server''.

You have to change how to load the file on the debug app.
Shake your phone until the dev menu appears. Click on ``Dev Settings`` and on ``Debug server host & port for device``. 

Enter the ip address of the machine who is running the react native CLI like that:
``X.X.X.X:8081``



## Launch the web app
First, install Webpack:
``npm install webpack -g``

Two solutions.

1. Use the webpack Hot dev server:
``npm start``
The Hot watcher dev server provides by Webpack allows us to develop with a inline hot reload web server.
The webapp will be available at this address: http://127.0.0.1:5555/web/index.html
You can update this address / port via the webpack.config.js file

3. Build the web app:
``npm run build``
This command will generate the app.js file needed will of the css from the scss files.
You will not need the source files to launch it on a browser via the index.html (files in the src folder). 


## More details

### Main design implementation
As for the Web project, I choose to use Material UI for React.

### Redux
The Redux data structure is exactly the same on Android and on the web project. No change was done.

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