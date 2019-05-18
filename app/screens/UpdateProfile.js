import React from 'react';
import { StyleSheet, Text, View, Image, AsyncStorage, ToastAndroid, ScrollView, BackHandler } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Content, Form, Item, Input, Header, Body } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconOne from 'react-native-vector-icons/MaterialCommunityIcons';
import IconTwo from 'react-native-vector-icons/Entypo';
import OfflineNotice from './OfflineNotice'
import Route from '../api/route';

import ImagePicker from 'react-native-image-picker';


const options = {
    title: "my pic app",
    takePhotoButtonTitle: "Take photo with your camera",
    chooseFromLibraryButtonTitle: "Choose photo from Library "
}

var userID;
export default class UpdateProfile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: '',
            id: '',
            lastName: "",
            isSubmit: true,
            avatarSource: null,
            email: '',
            number: '',
            data: '',
            dataKey: {},
            address: '',
            dateOfBirth: '',
            gender: '',
            profilePic: '',

        }
    }
    handleBackButton() {

        Actions.reset("Profile")
        return true;
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        let record = {}
        AsyncStorage.getItem('userId').then((userID) => {

            this.setState({ id: userID })
            AsyncStorage.getItem('Role').then((user) => {
                console.log('Data are', JSON.parse(user).role)
                let role = JSON.parse(user).role;
                if (role === "interpreter") {
                    console.log('You are Interpreter', userID);
                    Route(record, "post", "/interpreter/get/" + `${userID}`).then((response) => response.json()).then((json) => {
                        console.log('chal ja json', json)
                        this.setState({ firstName: json.content[0].firstName, lastName: json.content[0].lastName, email: json.content[0].emailAddress, number: json.content[0].phone, address: json.content[0].address, gender: json.content[0].gender, dateOfBirth: json.content[0].dateOfBirth, profilePic: json.content[0].profilePic })
                        console.log(json.content)


                    }).catch((err) => {
                        ToastAndroid.show(`failed${err}`, ToastAndroid.LONG)

                    })

                } else {


                    Route(record, "get", "/profile/userID/" + `${userID}`).then(response => response.json()).then((json) => {
                        this.setState({ firstName: json.data.firstName, lastName: json.data.lastName, email: json.data.emailAddress })
                        console.log(json.data)

                    }).catch((err) => {
                        ToastAndroid.show(`failed${err}`, ToastAndroid.LONG)
                    })
                }
            })
        })
    }
    takePicture() {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response.data);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                console.log('User FIles', response)
                const source = { uri: response.uri };
                this.setState({
                    avatarSource: source,
                    data: response.data,
                    dataKey: { 'key': 'i' }
                });
            }
        });
    }

    _update() {
        console.log('datas', this.state.data);
        console.log('keys', this.state.dataKey);
        console.log('emails', this.state.email)
        if (this.state.firstName === "") {
            this.setState({ isSubmit: false });
        }
        if (this.state.firstName.length < 4) {
            this.setState({ isSubmit: false });
        }
        if (this.state.lastName === "") {
            this.setState({ isSubmit: false });
        }
        if (this.state.lastName.length < 4) {
            this.setState({ isSubmit: false });
        }
        if (this.state.number === "") {
            this.setState({ isSubmit: false });
        }
        if (this.state.number.length < 11) {
            this.setState({ isSubmit: false });
        }
        if (this.state.firstName !== "" && this.state.firstName.length > 3 && this.state.lastName !== "" && this.state.lastName.length > 3 && this.state.number !== "" && this.state.number.length > 10) {
            let record = {}
            record.firstName = this.state.firstName;
            record.lastName = this.state.lastName;
            record.interpreterID = this.state.id;
            record.emailAddress = this.state.email;
            record.phone = this.state.number;
            record.data = this.state.data;
            record.dataKey = this.state.dataKey;
            record.address = this.state.address;
            record.dateOfBirth = this.state.dateOfBirth;
            record.gender = this.state.gender;
            record.profilePic = this.state.profilePic;
            AsyncStorage.getItem('Role').then((user) => {
                console.log('Data are', JSON.parse(user).role)
                let role = JSON.parse(user).role;
                if (role === "interpreter") {
                    Route(record, "post", "/update/interpreter").then(response => response.json()).then((json) => {
                        console.log('json', json)
                        if (json.code === 200) {
                            ToastAndroid.show('success', ToastAndroid.LONG)
                            Actions.Profile();
                        } else {
                            ToastAndroid.show('something wrong', ToastAndroid.LONG)
                            Actions.UpdateProfile();
                        }
                    }).catch((err) => {
                        ToastAndroid.show(`failed${err}`, ToastAndroid.LONG)
                    })



                }
                else {
                    Route(record, "post", "/update/user").then(response => response.json()).then((json) => {
                        console.log('json', json)
                        if (json.code === 200) {
                            ToastAndroid.show('success', ToastAndroid.LONG)
                            Actions.Profile();
                        } else {
                            ToastAndroid.show('something wrong', ToastAndroid.LONG)
                            Actions.UpdateProfile();
                        }
                    }).catch((err) => {
                        ToastAndroid.show(`failed${err}`, ToastAndroid.LONG)
                    })
                }
            }
            )
        }
    }
    render() {
        return (
            <Container>
                <Header>
                    <Body>
                        <IconTwo name="menu" size={30} color='white' onPress={() => Actions.Profile()} />
                    </Body>
                </Header>
                <ScrollView>
                    <Content>
                        <View style={styles.imageView} >
                            <Image source={this.state.avatarSource} style={styles.imageStyle} />

                        </View>
                        <Form>
                            <View style={styles.buttonView} >

                                <Icon.Button name="camera" style={styles.buttonIcon} backgroundColor="green" onPress={this.takePicture.bind(this)} >
                                    Change Picture
</Icon.Button>
                            </View>

                            <Item style={styles.itemTwo} >
                                <Icon name="user-o" size={24} />
                                <Input placeholder="First Name" value={this.state.firstName} onChangeText={(event) => this.setState({ firstName: event })} />
                            </Item>
                            {this.state.isSubmit === false ?
                                [this.state.firstName === "" ?
                                    <Text style={styles.error} >Please Enter First Name</Text> : this.state.firstName.length < 4 ? <Text style={styles.error} >First Name atLeast 4 Character</Text> : <View></View>
                                ] : <View></View>
                            }
                            <Item style={styles.itemTwo} >
                                <Icon name="user-o" size={24} />
                                <Input placeholder="Last Name" value={this.state.lastName} onChangeText={(event) => this.setState({ lastName: event })} />
                            </Item>
                            {this.state.isSubmit === false ?
                                [this.state.lastName === "" ?
                                    <Text style={styles.error} >Please Enter Last Name</Text> : this.state.lastName.length < 4 ? <Text style={styles.error} >Last Name atLeast 4 Character</Text> : <View></View>
                                ] : <View></View>
                            }
                            <Item style={styles.itemTwo} >
                                <Icon name="phone" size={24} />
                                <Input placeholder="Phone No" keyboardType='phone-pad' maxLength={11} value={this.state.number} onChangeText={(event) => this.setState({ number: event })} />
                            </Item>

                            {this.state.isSubmit === false ?
                                [this.state.number === "" ?
                                    <Text style={styles.error} >Please Enter Number</Text> : this.state.number.length < 11 ? <Text style={styles.error} >Invalid Mobile Number</Text> : <View></View>
                                ] : <View></View>
                            }

                            <View style={styles.buttonView} >

                                <IconOne.Button name="update" style={styles.buttonIcon} backgroundColor="green" onPress={this._update.bind(this)}>
                                    Updated
</IconOne.Button>

                            </View>




                        </Form>
                    </Content>

                    <OfflineNotice />
                </ScrollView>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    imageView: {
        paddingTop: '8%',
        paddingBottom: '0%',
        borderRadius: 100,
    },
    imageStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',

        width: 160,
        height: 160,
        borderRadius: 100,
        borderWidth: 1,
    },
    buttonIcon: {
        justifyContent: 'center',
        alignItems: 'center',

    },
    buttonView: {
        width: '60%',
        justifyContent: 'center',
        flex: 1,
        height: 100,
        marginLeft: '20%',
        alignContent: 'center',
        marginTop: '0%',

    },
    itemTwo: {
        width: '60%',
        marginLeft: '20%',
        paddingTop: '3%'
    },
    error: {
        marginLeft: '20%',
        color: 'red',
        fontSize: 8
    }
});