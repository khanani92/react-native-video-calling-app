import React from 'react';
import { StyleSheet, View, Image, ScrollView,  ToastAndroid } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Content, Form, Item, Input, Text } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import OfflineNotice from './OfflineNotice'
import Route from '../api/route';

export default class ResetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
            newPass: '',
            ConformPass: '',
            Matched: '',
            isSubmit: true
        }
    }
    
    GetConformPassFunction = (ConformPass) => {
      if(this.state.newPass == ConformPass){
          this.setState({ConformPass: ConformPass, Matched:'yes'})
      }else {
          this.setState({ConformPass: ConformPass, Matched:'no'})
      }
    }
    _ResetPass() {
        if (this.state.newPass === "") {
            this.setState({isSubmit:false});
        }
        if (this.state.ConformPass === "") {
            this.setState({isSubmit:false})
        }
        if(this.state.Matched === "no"){
            this.setState({isSubmit:false})
        }
        if (this.state.newPass.length < 8) {
            this.setState({isSubmit:false})
        } 
        if((this.state.newPass !== "" &&  this.state.newPass.length > 7 ) && (this.state.ConformPass !== ""  && this.state.Matched === "yes") ) {
            
            let record = {}
            record.emailAddress = this.state.ConformPass;
            record.password = this.state.newPass;
           // record.ConformPass = this.state.ConformPass;
            console.log(record);
            Route(record, "post", "/change/password").then(response => response.json()).then((json) => {
                console.log('json', json)
                if(json.code === 200){
                ToastAndroid.show('success', ToastAndroid.LONG)
                Actions.Login();
                }else{
                    ToastAndroid.show('something missing', ToastAndroid.LONG)
                    Actions.ResetPassword()
                }
              }).catch((err) => {
                ToastAndroid.show(`failed${err}`, ToastAndroid.LONG)
              })
        }
    }
    render() {
        return (
            <Container>
                <ScrollView>
                    <Content style={styles.container}>
                
                        <View style={styles.imageView} >
                            <Image source={require('../images/connect.jpg')} style={styles.imageStyle} />
                        </View>
                        <Form>
                            <Item style={styles.itemTwo} >
                                <Icon name="key" size={24} />
                                <Input placeholder="New Password"  secureTextEntry={true} onChangeText={(event) => this.setState({newPass:event})} />
                            </Item>
                            { this.state.isSubmit ===  false ?
                                [this.state.newPass === "" ?
                                <Text style={styles.error} >Please Enter Password</Text> : this.state.newPass.length < 8 ? <Text style={styles.error} >New Password atLeast 8 Character Long</Text> : <View></View>
                            ]:<View></View>
                            }
                            <Item style={styles.itemTwo} >
                                <Icon name="key-variant" size={24} />
                                <Input placeholder="Conform New Pass" secureTextEntry={true}   onChangeText={ConformPass => this.GetConformPassFunction(ConformPass)} />
                            </Item>
                            {this.state.isSubmit === false ?
                                [this.state.ConformPass === "" ?
                                <Text style={styles.error} >Please Enter Conform Password</Text> : this.state.Matched === "no" ? <Text style={styles.error} >Password Not Matched</Text> : <View></View>
                                ]:<View></View>
                            }
                            <View style={styles.buttonView} >

                                <Icon.Button name="check-outline" style={styles.buttonIcon} backgroundColor="green" onPress={this._ResetPass.bind(this)} >
                                    Submit
</Icon.Button>
                            </View>

                        </Form>
                    </Content>
                </ScrollView>
               
                <OfflineNotice /> 
               
            </Container>
        );
    }
}
const styles = StyleSheet.create({
    imageView: {
        paddingTop: '15%',
        paddingBottom: '8%',
        marginBottom:'5%'
    },
    imageStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: '10%'
    },
    container: {
        backgroundColor: '#fff',
        paddingTop: '0%'
    },
    itemTwo: {
        width: '60%',
        marginLeft: '20%',
        paddingTop: '3%',

    },
    buttonIcon: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonView: {
        width: '60%',
        justifyContent: 'center',
        flex: 1,
        height: 100,
        marginLeft: '20%',
        alignContent: 'center',
        marginTop: '5%'
    },
    error: {
        marginLeft: '20%',
        color: 'red',
        fontSize: 8
      }
});