import React from 'react';
import { StyleSheet, AsyncStorage } from 'react-native';
import Login from './app/screens/Login';
import { Router, Scene, Actions } from 'react-native-router-flux';
import Signup from './app/screens/Signup';
import Verification from './app/screens/Verification';
import ForgotPassword from './app/screens/ForgotPassword';
import ResetPassword from './app/screens/ResetPassword';
import Profile from './app/screens/Profile';
import Main from './app/screens/Main';
import Reviewer from './app/screens/Reviewer';
import UpdateProfile from './app/screens/UpdateProfile';
import Reviews from './app/screens/Reviews';
import StartCall from './app/screens/StartCall';
import Chat from './app/screens/Chat';
import ChatList from './app/screens/ChatList';
import Interpreter from './app/screens/Interpreter';
import Payment from './app/screens/Payment';
import ChangePassword from './app/screens/ChangePassword';
import OneSignal from 'react-native-onesignal';
import { Emitter } from './app/api/emit';
import Splash from './app/screens/Splash';
import Toasters from './app/screens/Toaster';




import io from 'socket.io-client';
//io.set('transports', ['websocket']);
var interpreterID;
var interpreterName;
var interpreterPic;
var oldSocketID;
var lat = 0.0;
var lng = 0.0;
const socket = io('http://142.93.9.81', {
  reconnection: true,
  reconnectionDelay: 100,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: 99999
});


socket.on('connect', function () {
  console.log('connected to server');
  console.log('so',socket.connected)


  AsyncStorage.getItem('Role').then((user) => {
    let role = JSON.parse(user).role;
    let userID = JSON.parse(user)._id;
    console.log('usera role', userID)
    if(role === "interpreter"){
    interpreterID = JSON.parse(user)._id;
    interpreterName = JSON.parse(user).firstName;
    interpreterPic = JSON.parse(user).profilePic;
    console.log('IDD', interpreterID)
    AsyncStorage.getItem('oldSocketID').then((Old) => {
      console.log('Old are', Old)
      oldSocketID = JSON.parse(Old);
    })
    AsyncStorage.getItem('Active').then((token) => {
      let record = {}
      console.log('Active are', typeof (token))
      if (Boolean(token) === true) {
        record.interpreterID = interpreterID;
        record.interpreterName = interpreterName;
        record.interpreterPic = interpreterPic;
        record.lat = lat;
        record.lng = lng;
        record.booked = false;
        record.socketID = oldSocketID
        
         
        AsyncStorage.setItem('oldSocketID', JSON.stringify(socket.id) );
    //    console.log(record,'reeeeee')
        Emitter('checkSocketConnectionInterpreter', record, 'interpreterActive')
        

      }
    }).catch((err) => {
      ToastAndroid.show(`failed${err}`, ToastAndroid.LONG)

    })

  }else{
    
    Emitter('registerUser', userID, 'registeredToSocket')
  }

  })




});
socket.on('disconnect', function () {

  console.log('disconnected')
  socket.io.connect();
  
  


});

global.socket = socket;




export default class App extends React.Component {

  constructor(properties) {
    super(properties);
    this.state = {
      socket: null,
      userId: '',
      interpreterID: '',
      interpreterName: '',
      interpreterPic: '',
      lng: 0.0,
      lat: 0.0,
      oldSocketID: ''
    }
    OneSignal.init("e2e0ca59-961b-4c06-b94f-0acd95e9373d");

    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
  }
   
 

  componentWillUnmount() {

    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived(notification) {
    console.log("Notification received: ", notification);
  }

  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  onIds(device) {
    console.log('Device info: ', device);
  }


  render() {

    return (
      <Router showNavigationBar={false} >
        <Scene key="root" >
          <Scene
            key="Login"
            component={Login}
            hideNavBar={true}
          //  initial
            
        


          />
          
          <Scene
            key="Signup"
            component={Signup}
            title="Signup"

            hideNavBar={true}

          />
          <Scene
            key="Verification"
            component={Verification}
            title="Verification"
            hideNavBar={true}




          />
          <Scene
            key="ForgotPassword"
            component={ForgotPassword}
            title="Forgot Password"
            hideNavBar={true}




          />
          <Scene
            key="ResetPassword"
            component={ResetPassword}
            title="ResetPassword"
            hideNavBar={true}






          />
          <Scene
            key="Main"
            component={Main}
            title="Main"
            hideNavBar={true}
           // initial 


          />
          <Scene
            key="Profile"
            component={Profile}
            title="Profile"
            hideNavBar={true}



          />
          <Scene
            key="Reviewer"
            component={Reviewer}
            title="Reviewer"
            hideNavBar={true}


          />
          <Scene
            key="UpdateProfile"
            component={UpdateProfile}
            title="Edit"

            hideNavBar={true}

          />
          <Scene
            key="Reviews"
            component={Reviews}
            title="Reviews"
            hideNavBar={true}


          />
          <Scene
            key="StartCall"
            component={StartCall}
            title="StartCall"
            hideNavBar={true}
          />

          <Scene
            key="Chat"
            component={Chat}
            title="Chat"
            hideNavBar={true}

          />
          <Scene
            key="ChatList"
            component={ChatList}
            title="ChatList"
            hideNavBar={true}
          />

          <Scene
            key="Interpreter"
            component={Interpreter}
            title="Interpreter"
            hideNavBar={true}

          />
          <Scene
            key="Payment"
            component={Payment}
            title="Payment"
            hideNavBar={true}

          />
          <Scene
            key="ChangePassword"
            component={ChangePassword}
            title="ChangePassword"
            hideNavBar={true}
          />
          <Scene
          key="Splash"
          component={Splash}
          hideNavBar={true}
          title="Splash"
          //initial
          />
          <Scene
          key="Toasters"
          component={Toasters}
          hideNavBar={true}
          title="Toasters"
          initial
          />
        </Scene>
      </Router>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
