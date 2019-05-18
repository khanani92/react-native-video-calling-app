import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, ToastAndroid } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Content, Form, Item, Input } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import OfflineNotice from './OfflineNotice'
import Route from '../api/route';

export default class Verification extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            code: '',
            isSubmit:true
        }
    }

    _Verification() {
        if (this.state.code === "") {
            this.setState({ isSubmit:false })
        }
        if (this.state.code !== "") {
            this.setState({isSubmit:true})
            let record = {}
            record.code = this.state.code;
            console.log(record);
            Route(record, "POST", "/films").then(response => response.json()).then((json) => {
                console.log('json', json)
                ToastAndroid.show('success', ToastAndroid.LONG)
                Actions.Main();
        
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
                                <Icon name="verified" size={24} />
                                <Input placeholder="Verification Code" keyboardType='phone-pad' onChangeText={(event) => this.setState({ code: event })} />
                            </Item>
                            {this.state.isSubmit === false ?
                               [ this.state.code === "" ?
                                <Text style={styles.error} >Please Enter Code</Text> : <View></View>
                               ]:<View></View>
                            }
                            <View style={styles.buttonView} >

                                <Icon.Button name="ticket-confirmation" style={styles.buttonIcon} backgroundColor="green" onPress={this._Verification.bind(this)}>
                                    Verification
</Icon.Button>
                                <Text style={styles.accountStyle} >Already account? <Text style={{ color: 'blue' }} onPress={() => Actions.Login()}  > Login</Text></Text>
                            </View>
                            <View>
                                <Text style={styles.accountStyleTwo} >Don't have an account? <Text style={{ color: 'blue' }} onPress={() => Actions.Signup()}  > Signup</Text></Text>
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
        paddingBottom: '17%'
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