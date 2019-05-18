import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, ToastAndroid, BackHandler } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Content, Form, Item, Input, Left } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import RadioGroup from 'react-native-custom-radio-group';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { GoogleSignin } from 'react-native-google-signin';
import Route from '../api/route';
import OfflineNotice from './OfflineNotice'





const radioGroupList = [
  {
    label: 'Male',
    value: 'Male'
  },
  {
    label: 'Female',
    value: 'Female'
  }
]


export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderValue: '',
      userInfo: '',
      email: '',
      firstName: '',
      number: '',
      personpassword: '',
      onValue: null,
      lastName: '',
      isSubmit: true,
      isverified: true


    }
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }
  handleBackButton() {
    Actions.reset("Login")
    return true;
}
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    GoogleSignin.hasPlayServices({ autoResolve: true });
    GoogleSignin.configure({
      webClientId: '703352747336-baum18onta4k75ak5a3lu5e5jt8r081i.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)

    });
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
  _submit() {

    if (this.state.firstName === "") {
      this.setState({ isSubmit: false });
    }
    if (this.state.lastName === "") {
      this.setState({ isSubmit: false });
    }
    if (this.state.email === "") {
      this.setState({ isSubmit: false });
    }
    if (this.state.number === "") {
      this.setState({ isSubmit: false });
    }
    if (this.state.personpassword === "") {
      this.setState({ isSubmit: false });
    }
    if (this.state.genderValue === "") {
      this.setState({ isSubmit: false });
    }
    if (this.state.firstName.length < 4) {
      this.setState({ isSubmit: false });
    }
    if (this.state.lastName.length < 4) {
      this.setState({ isSubmit: false });
    }
    if (this.state.number.length < 11) {
      this.setState({ isSubmit: false });
    }
    if (this.state.personpassword < 8) {
      this.setState({ isSubmit: false });
    }
    if (this.state.isverified === false) {
      this.setState({ isSubmit: false });
    }


    if ((this.state.firstName !== "" && this.state.firstName.length > 3) && (this.state.lastName !== "" && this.state.lastName.length > 3) && (this.state.email !== "" && this.state.isverified === true) && (this.state.number !== "" && this.state.number.length > 10) && (this.state.personpassword !== "" && this.state.personpassword.length > 7) && (this.state.genderValue !== "")) {
      let record = {}
      console.log('num')
      this.setState({
        isSubmit: true
      })

      record.firstName = this.state.firstName;
      record.lastName = this.state.lastName;
      var email = this.state.email;
      record.emailAddress = email.toLowerCase();
      record.phone = this.state.number;
      record.pinCode = this.state.personpassword;
      record.gender = this.state.genderValue;
      console.log(record)

      Route(record, "post", "/register/user").then(response => response.json()).then((json) => {
        console.log('json', json)
        ToastAndroid.show('success', ToastAndroid.LONG)
        Actions.Verification()

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


            <Form  >

              <Item style={styles.itemOne}  >
                <Icon name="user-o" size={24} />
                <Input placeholder="First Name" onChangeText={(event) => {

                  this.setState({ firstName: event })

                }} />
              </Item>
              {this.state.isSubmit === false ?
                [this.state.firstName === "" ?
                  <Text style={styles.error} >Please Enter First Name</Text> : this.state.firstName.length < 4 ? <Text style={styles.error} >Name atLeast 4 Character Long</Text> : <View></View>
                ] : <View></View>
              }
              <Item style={styles.itemOne}  >
                <Icon name="user-o" size={24} />
                <Input placeholder="Last Name" onChangeText={(event) => this.setState({ lastName: event })} />
              </Item>
              {this.state.isSubmit === false ?
                [this.state.lastName === "" ?
                  <Text style={styles.error} >Please Enter Last Name</Text> : this.state.lastName.length < 4 ? <Text style={styles.error} >Name atLeast 4 Character Long</Text> : <View></View>
                ] : <View></View>
              }
              <Item style={styles.itemTwo} >
                <Icon name="envelope-o" size={24} />
                <Input placeholder="Email" onChangeText={(text) => this.validate(text)} />
              </Item>
              {this.state.isSubmit === false ?
                [this.state.email === "" ?
                  <Text style={styles.error} >Please Enter Email</Text> : this.state.isverified === false ? <Text style={styles.error} >Invalid Email Adrress</Text> : <View></View>
                ] : <View></View>
              }
              <Item style={styles.itemTwo} >
                <Icon name="phone" size={24} />
                <Input placeholder="Phone No" keyboardType='phone-pad' maxLength={11} onChangeText={(event) => this.setState({ number: event })} />
              </Item>

              {this.state.isSubmit === false ?
                [this.state.number === "" ?
                  <Text style={styles.error} >Please Enter Number</Text> : this.state.number.length < 11 ? <Text style={styles.error} >Invalid Mobile Number</Text> : <View></View>
                ] : <View></View>
              }

              <Item style={styles.itemTwo} >
                <Icon name="eye" size={24} />
                <Input placeholder="Password" secureTextEntry={true} onChangeText={(event) => this.setState({ personpassword: event })} />
              </Item>
              {this.state.isSubmit === false ?
                [this.state.personpassword === "" ?
                  <Text style={styles.error} >Please Enter Password</Text> : this.state.personpassword.length < 8 ? <Text style={styles.error} >Password atLeast 8 Character Long</Text> : <View></View>
                ] : <View></View>
              }

              <View style={{ paddingTop: '4%' }} >
                <Left style={styles.radioStyle}>

                  <RadioGroup buttonContainerStyle={{ width: 100, height: 40, marginLeft: "2%" }}
                    radioGroupList={radioGroupList} onChange={(value) => this.setState({ genderValue: value })}
                  />
                </Left>
                {this.state.isSubmit === false ?
                  [this.state.genderValue === "" ?
                    <Text style={styles.error} >Please Select Gender</Text> : <View></View>
                  ] : <View></View>
                }
              </View>


              <View style={styles.buttonView} >

                <Icon.Button name="user-plus" style={styles.buttonIcon} backgroundColor="green" onPress={this._submit.bind(this)}>
                  Signup
</Icon.Button>
              </View>

              <Text style={styles.accountStyle} >Already account? <Text style={{ color: 'blue' }} onPress={() => {Actions.reset("Login"), BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton); } } > Login</Text></Text>

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
  },
  itemOne: {
    width: '60%',
    marginLeft: '20%',
    marginTop: '1%'
  },
  itemTwo: {
    width: '60%',
    marginLeft: '20%',
    marginTop: '2%'
  },
  radioStyle: {
    flexDirection: 'row',
  },
  accountStyle: {
    textAlign: 'center',
    paddingTop: '0%',
    marginBottom: '14%'
  },
  imageView: {
    marginTop: '0%',
    marginBottom: '1%'
  },
  imageStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  fbButton: {
    width: '60%',
    justifyContent: 'center',
    marginLeft: '20%',
    alignContent: 'center',
  },
  googleButton: {
    marginTop: '4%',
    width: '60%',
    justifyContent: 'center',
    marginLeft: '20%',
  },
  buttonIcon: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonView: {
    width: '60%',
    justifyContent: 'center',
    height: 80,
    marginLeft: '20%',
    alignContent: 'center'
  },
  error: {
    marginLeft: '20%',
    color: 'red',
    fontSize: 8
  }

});
