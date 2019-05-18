import React from 'react';
import { StyleSheet, View, Image, AsyncStorage, BackHandler } from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import { Container, Content, Form, Header, Text, Left, Right, ListItem, List, Body, Switch } from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';
import IconTwo from 'react-native-vector-icons/Entypo';
import IconThree from 'react-native-vector-icons/MaterialCommunityIcons';
import OfflineNotice from './OfflineNotice';
//import SocketIOClient from 'socket.io-client';
import { Emitter } from '../api/emit';

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
            role: '',
            interpreterID: '',
            interpreterName: '',
            interpreterPic: '',
            lng: 0.0,
            lat: 0.0
        }
    }
    BackButton() {

        return true
    }
    componentWillUnmount() {
        console.log(Actions.state.index, '<<<<<<<<<<<profile')
    }
    handleBackButton() {
        AsyncStorage.getItem('Role').then((user) => {
            let role = JSON.parse(user).role;
            let id = JSON.parse(user)._id;
            Actions.reset("Main", { id: id, role: role })

        })
        return true;
      }
    componentWillUnmount() {
         BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
      }
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

        AsyncStorage.getItem('Role').then((user) => {
            console.log('Data are', JSON.parse(user))
            let role = JSON.parse(user).role;

            if (role === "interpreter") {
                this.setState({ role: 'interpreter', interpreterID: JSON.parse(user)._id, interpreterName: JSON.parse(user).lastName, interpreterPic: JSON.parse(user).profilePic })
            } else if (role === "user") {
                this.setState({ role: 'user' })
            }

        })


    }
    Logout() {
        AsyncStorage.clear();
        Actions.reset("Login");
    }
    active() {
        console.log(Actions.state.index, '<<<<<<<<<<<profile')
        this.setState({ active: !this.state.active }, () => {
            console.log('active', this.state.active)
            let record = {}
            if (this.state.active === true) {
                record.interpreterID = this.state.interpreterID;
                record.interpreterName = this.state.interpreterName;
                record.interpreterPic = this.state.interpreterPic;
                record.lat = this.state.lat;
                record.lng = this.state.lng;
                Emitter('registerActiveInterpreter', record, 'interpreterActive')
            }

            if (this.state.active === false) {
                record.interpreterID = this.state.interpreterID;
                Emitter('removeActiveInterpreter', record, 'interpreterDeActive')
            }
        })

    }
    goBack() {
        AsyncStorage.getItem('Role').then((user) => {
            let role = JSON.parse(user).role;
            let id = JSON.parse(user)._id;
            Actions.reset("Main", { id: id, role: role })

        })
    }
    render() {
        return (
            <Container>
                <Header>

                    <Body>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', }}>
                            <IconTwo name="menu" size={30} color='white' onPress={this.goBack.bind(this) } />
                            <Text style={{ color: 'white', justifyContent: 'center', flex: 1, textAlign: 'center', fontFamily: 'Times' }}>User Profile</Text>
                        </View>
                    </Body>
                </Header>
                <Content>

                    <View style={styles.imageView} >
                        <Image source={require('../images/baby.jpg')} style={styles.imageStyle} />
                        <Text style={{ justifyContent: "center", alignItems: 'center', textAlign: 'center', marginTop: '2%', fontFamily: 'Times' }} >Muhammad Yousuf</Text>
                    </View>
                    <Form>
                        <List>
                            {this.state.role === "interpreter" ?
                                <ListItem noBorder onPress={this.active.bind(this)} >
                                    <Left>
                                        <Icon name="switcher" size={30} />
                                        <Text style={{ marginLeft: '5%', fontFamily: 'Times' }} >Active</Text>
                                    </Left>
                                    <Right>
                                        <Switch value={this.state.active} />

                                    </Right>
                                </ListItem > : <View></View>}
                            <ListItem noBorder onPress={() => {Actions.UpdateProfile(), BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);}}>
                                <Left>
                                    <Icon name="user" size={30} />
                                    <Text style={{ marginLeft: '5%', fontFamily: 'Times' }} >Personal Information</Text>
                                </Left>
                                <Right>
                                    <Icon name="right" size={30} />
                                </Right>
                            </ListItem >
                            <ListItem noBorder onPress={() =>{ Actions.ChangePassword(),  BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);}}>
                                <Left>
                                    <IconThree name="account-key" size={30} />
                                    <Text style={{ marginLeft: '5%', fontFamily: 'Times' }} >Change Password</Text>
                                </Left>
                                <Right>
                                    <Icon name="right" size={30} />
                                </Right>
                            </ListItem >

                            <ListItem noBorder onPress={() => {Actions.Reviewer(), BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);}} >
                                <Left>
                                    <Icon name="staro" size={30} />
                                    <Text style={{ marginLeft: '5%', fontFamily: 'Times' }} >Reviewer</Text>
                                </Left>
                                <Right>
                                    <Icon name="right" size={30} />
                                </Right>
                            </ListItem >
                            <ListItem noBorder onPress={this.Logout.bind(this)} >
                                <Left>
                                    <Icon name="logout" size={30} />
                                    <Text style={{ marginLeft: '5%', fontFamily: 'Times' }} >Logout</Text>
                                </Left>
                            </ListItem >
                        </List>
                    </Form>
                </Content>

                <OfflineNotice />

            </Container>
        );
    }
}

const styles = StyleSheet.create({
    imageView: {
        paddingTop: '8%',
        paddingBottom: '2%',
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

});