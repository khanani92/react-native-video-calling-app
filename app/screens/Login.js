import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, ToastAndroid, AsyncStorage, ActivityIndicator, BackAndroid, BackHandler } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Content, Form, Item, Input } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { GoogleSignin } from 'react-native-google-signin';
import OfflineNotice from './OfflineNotice'
import Route from '../api/route';

//import SocketIOClient from 'socket.io-client';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: '',
            email: '',
            personpassword: '',
            isverified: true,
            isSubmit: true,
            loader: false
        }

        /* this.socket = SocketIOClient('http://localhost:80000');
         this.socket.emit('channel1', 'Hi server'); // emits 'hi server' to your server
     	
         // Listens to channel2 and display the data recieved
     this.socket.on('channel2', (data) => {
         console.log('Data recieved from server', data); //this will console 'channel 2'
       });
     */
    }
    componentDidMount() {
        console.log('login Did Mount')
        BackHandler.addEventListener('hardwareBackPress', this.exit);
        GoogleSignin.hasPlayServices({ autoResolve: true });
        GoogleSignin.configure({
            webClientId: '703352747336-baum18onta4k75ak5a3lu5e5jt8r081i.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)

        });

    }

    _signIn = async () => {
        console.log('gmail')
        try {
            await GoogleSignin.revokeAccess();
            console.log('deleted');
        } catch (error) {
            console.error(error);
        }
        const userInfo = await GoogleSignin.signIn();
        console.log(userInfo.accessToken)
        userInfo.then(data => {
            console.log(data)
        })
        this.setState({ userInfo });
    };
    handleBackButton() {
        return true;
    }
    exit() {
        BackHandler.exitApp();
        return true;
    }
    componentWillUnmount() {
        console.log('login Will unmount');
        if(!Actions.state.index){
            BackHandler.removeEventListener('hardwareBackPress', this.exit);
        }
        // BackHandler.removeEventListener('hardwareBackPress', this.exit);
    }
    _fbAuth() {
        LoginManager.logInWithReadPermissions(['public_profile']).then(function (result) {

            if (result.isCancelled) {
                console.log('Login was cancelled');

            } else {

                console.log('Login was a success ' + result.grantedPermissions.toString());

                AccessToken.getCurrentAccessToken().then(
                    (data) => {

                        console.log(data.accessToken.toString())
                        let record = {}
                        record.socialAccessToken = data.accessToken.toString();
                        console.log(record)
                        Route(record, "post", "/login/social").then(response => response.json()).then((json) => {
                            console.log('json', json)
                            ToastAndroid.show('success', ToastAndroid.LONG)
                            Actions.Verification()

                        }).catch((err) => {
                            ToastAndroid.show(`failed${err}`, ToastAndroid.LONG)
                        })

                    }
                )




            }
        }, function (error) {
            console.log("An error occured: " + error);
        })


    }
    validate = (text) => {

        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (text.length <= 0) {
            this.setState({ email: '' })
        } else if (reg.test(text) === false) {
            this.setState({ isverified: false, email: text })
            return false;
        }
        else {
            this.setState({ email: text, isverified: true })

        }
    }
    _Login() {
        console.log(Actions.state.index,">>>>>login")
        this.setState({ loader: true })
        if (this.state.email === "") {
            this.setState({ isSubmit: false, loader: false })

        }
        if (this.state.personpassword === "") {
            this.setState({ isSubmit: false, loader: false })
        }
        if (this.state.isverified === false) {
            this.setState({ isSubmit: false, loader: false })
        }
        if ((this.state.email !== "" && this.state.isverified === true) && (this.state.personpassword !== "")) {
            let record = {}
            this.setState({ isSubmit: true })
            var email = this.state.email;
            record.emailAddress = email.toLowerCase();
            record.pinCode = this.state.personpassword;
            console.log(record);
            Route(record, "post", "/login/user").then(response => response.json()).then((json) => {
                console.log('json', json)

                if (json.code === 200) {
                    ToastAndroid.show('success', ToastAndroid.LONG)
                    console.log('UID', json.user[0])
                    AsyncStorage.setItem('Role', JSON.stringify(json.user[0]));
                    let user = json.user[0]._id;
                    console.log('dek', json.user[0].role)
                    let roles = json.user[0].role;
                    Actions.reset("Main",{ id: user, role: roles });
                    // BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
                } else {
                    ToastAndroid.show('Not Found', ToastAndroid.LONG)
                    Actions.reset("Login");
                    
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
                    <Content style={styles.container} >

                        <View style={styles.imageView} >
                            <Image source={require('../images/connect.jpg')} style={styles.imageStyle} />
                        </View>
                        <View style={styles.fbButton}>
                            <Icon.Button name="facebook" style={styles.buttonIcon} backgroundColor="#3b5998" onPress={this._fbAuth}>
                                Login with Facebook
  </Icon.Button>
                        </View>
                        <View style={styles.googleButton} >
                            <Icon.Button name="google" backgroundColor="#dd4b39" style={styles.buttonIcon} onPress={this._signIn}>
                                Login with Gmail
  </Icon.Button>
                        </View>
                        {this.state.loader === true ?
                            <ActivityIndicator size="large" color="#0000ff" /> : <View></View>
                        }
                        <Form>
                            <Item style={styles.itemOne}  >
                                <Icon name="envelope-o" size={24} />
                                <Input placeholder="Email" onChangeText={(text) => this.validate(text)} />
                            </Item>
                            {this.state.isSubmit === false ?
                                [this.state.email === "" ?
                                    <Text style={styles.error} >Please Enter Email</Text> : this.state.isverified === false ? <Text style={styles.error} >Wrong Email Adrress</Text> : <View></View>
                                ] : <View></View>
                            }
                            <Item style={styles.itemTwo} >
                                <Icon name="eye" size={24} />
                                <Input placeholder="Password" secureTextEntry={true} onChangeText={(event) => this.setState({ personpassword: event })} />
                            </Item>

                            {this.state.isSubmit === false ?
                                [this.state.personpassword === "" ?
                                    <Text style={styles.error} >Please Enter Password</Text> : <View></View>
                                ] : <View></View>
                            }

                            <View style={styles.forgotStyle} >
                                <Text style={{ color: 'blue' }} onPress={() => {Actions.ForgotPassword(), BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton); } }>Forgot Password?</Text>
                            </View>
                            <View style={styles.loginStyle} >

                                <Icon.Button name="lock" style={styles.buttonIcon} backgroundColor="green" onPress={this._Login.bind(this)}>
                                    Login
    </Icon.Button>
                            </View><View style={{ paddingTop: '3%' }} >
                                <Text style={{ textAlign: 'center' }} >Don't have an account? <Text style={{ color: 'blue' }} onPress={() => { Actions.reset('Signup'), BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton); } }  > Signup</Text></Text>
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
    container: {
        backgroundColor: '#fff',
        paddingTop: '0%'
    },
    itemOne: {
        width: '60%',
        marginLeft: '20%',
        paddingTop: '3%'
    },
    itemTwo: {
        width: '60%',
        marginLeft: '20%',
        paddingTop: '3%'
    },
    imageView: {
        paddingTop: '10%',
        paddingBottom: '5%'
    },
    imageStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    fbButton: {
        paddingTop: '8%',
        width: '60%',
        justifyContent: 'center',
        marginLeft: '20%',
        alignContent: 'center',
        marginBottom: 'auto',
        marginTop: 'auto'
    },
    googleButton: {
        paddingTop: '10%',
        width: '60%',
        justifyContent: 'center',
        marginLeft: '20%',
        marginBottom: '5%'
    },
    buttonIcon: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    forgotStyle: {
        marginTop: '3%',
        width: '60%',
        justifyContent: 'center',
        flex: 1,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    loginStyle: {
        width: '60%',
        justifyContent: 'center',
        flex: 1,
        height: 100,
        marginLeft: '20%',
        alignContent: 'center',
        paddingTop: '7%'

    },
    error: {
        marginLeft: '20%',
        color: 'red',
        fontSize: 8
    }
});
