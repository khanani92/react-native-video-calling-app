import React, { Component } from 'react';
import { View , TouchableOpacity, AsyncStorage} from 'react-native';
import { OTSession, OTPublisher, OTSubscriber } from 'opentok-react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Actions } from 'react-native-router-flux';
export default class StartCall extends Component {
  constructor(props) {
    super(props);
    this.apiKey = '46239252';
    this.sessionId = '2_MX40NjIzOTI1Mn5-MTU0NTIwNTMzNTE3N353a3dpbEw1NldiNkpiV09tQmg0cE9oNVB-fg';
    this.token = 'T1==cGFydG5lcl9pZD00NjIzOTI1MiZzaWc9NjRlMDg1MDdjZDU3YWM3ZjUwZjRmMDE4YWUxN2NmNTQzMzEzYWVhODpzZXNzaW9uX2lkPTJfTVg0ME5qSXpPVEkxTW41LU1UVTBOVEl3TlRNek5URTNOMzUzYTNkcGJFdzFObGRpTmtwaVYwOXRRbWcwY0U5b05WQi1mZyZjcmVhdGVfdGltZT0xNTQ1MjA1MzM1JnJvbGU9bW9kZXJhdG9yJm5vbmNlPTE1NDUyMDUzMzUuMjU1MTY2ODczOTAxNw==';
  }
  CallEnd(){
       this.apiKey = "";
       this.sessionId = "";
       this.token = "";
       AsyncStorage.getItem('Role').then((user) => {
        console.log('Data are', JSON.parse(user).role);
        let role = JSON.parse(user).role;
        if (role === "interpreter"){
          Actions.pop();
        }else{
          Actions.Reviews();
        }
       })
      
  }
  render() {
    return (
      <View>
      <View style={{ justifyContent:'center', alignItems:'center', marginTop:'5%' }}>
        <OTSession apiKey={this.apiKey} sessionId={this.sessionId} token={this.token}>
           <OTPublisher style={{ width: 350, height:350 }} /> 
          <OTSubscriber style={{ width: 350, height: 350 }} />
        </OTSession>
       
      </View>
      <TouchableOpacity style={{ marginTop: 360, justifyContent:'center', alignItems:'center' }} onPress={this.CallEnd.bind(this)}  >
                                <Icon name="call-end" size={60} color="#DC143C" />
                            </TouchableOpacity>
      </View>
    );
  }
}