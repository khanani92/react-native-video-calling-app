import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, ToastAndroid, BackHandler } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Content, Form, Item, Input,Footer } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import OfflineNotice from './OfflineNotice';
import Route from '../api/route';

export default class ForgotPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            isverified:true,
            isSubmit:true

        }
    }
    handleBackButton() {
        Actions.reset("Login")
        return true;
    }
  
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }
   validate = (text) => {
    
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (text.length <= 0) {
          this.setState({ email: '' })
        } else if (reg.test(text) === false) {
          this.setState({ isverified:false , email: text})
          return false;
        }
        else {
          this.setState({ email: text , isverified:true})
    
        }
      }
    _ForgotPassword() {
        
        if (this.state.email === "") {
            this.setState({ isSubmit:false })
        }
        if (this.state.isverified === false) {
            this.setState({ isSubmit:false })
        }
        if (this.state.email !== ""  && this.state.isverified === true) {
            this.setState({isSubmit:true})
            let record = {}
            record.emailAddress = this.state.email;
          Route(record, "post", "/send/verifyCode").then(response => response.json()).then((json) => {
                console.log('json', json)
                if(json.code === 200){
                    ToastAndroid.show('success', ToastAndroid.LONG)
                    Actions.ResetPassword();
                    }else{
                        ToastAndroid.show('Email Not Found', ToastAndroid.LONG)
                        Actions.ForgotPassword();
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
                                <Icon name="email-outline" size={24} />
                                <Input placeholder="Email" onChangeText={(text) => this.validate(text)} />
                            </Item>
                            { this.state.isSubmit === false ?
                                [this.state.email === "" ?
                                <Text style={styles.error} >Please Enter Email</Text> : this.state.isverified === false ? <Text style={styles.error} >Wrong Email Adrress</Text> : <View></View>
                                ]:<View></View>
                            }
                            <View style={styles.buttonView} >

                                <Icon.Button name="send" style={styles.buttonIcon} backgroundColor="green" onPress={this._ForgotPassword.bind(this)}  >
                                    Send
</Icon.Button>
                                <Text style={styles.accountStyle} >Already account? <Text style={{ color: 'blue' }} onPress={() =>{ Actions.Login(), BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);}}  > Login</Text></Text>
                            </View>
                            <View>
                                <Text style={styles.accountStyleTwo} >Don't have an account? <Text style={{ color: 'blue' }} onPress={() => { Actions.Signup(),BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton); }}  > Signup</Text></Text>
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
        paddingTop: '20%',
        paddingBottom: '14%'
    },
    imageStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: '7%'
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
    accountStyle: {
        textAlign: 'center',
        paddingTop: '5%'
    },
    accountStyleTwo: {
        paddingTop: '2%',
        textAlign: 'center'
    },
    error: {
        marginLeft: '20%',
        color: 'red',
        fontSize: 8
    }

});