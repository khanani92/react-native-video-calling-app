import React from 'react';
import { Actions } from 'react-native-router-flux';
import { Container, Tab, Tabs, Header, Right, } from 'native-base';
import { AsyncStorage, BackHandler } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CallNow from './CallNow';
import History from './History';
import ChatList from './ChatList';
import Route from '../api/route';
import OfflineNotice from './OfflineNotice';
import { Emitter } from '../api/emit';

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            interpreterID: '',
            interpreterName: '',
            interpreterPic: '',
            lng: 0.0,
            lat: 0.0,
            oldSocketID: '',
            role: false,
            
        }

    }
    next() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
        Actions.Profile()
    }
    componentWillMount() {
        console.log('role', this.props.role)
        if (this.props.role === "interpreter") {
            this.setState({ role: true })
        }
    }
    
    handleBackButton() {
        BackHandler.exitApp();
        return true;
    }
    componentWillUnmount() {
        if (Actions.state.index === 0) {
            BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
        }
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        let record = {}
        const userID = this.props.id;
        AsyncStorage.getItem('Role').then((user) => {
            console.log('Data are', JSON.parse(user))
            let role = JSON.parse(user).role;
            if (role === "interpreter") {
                this.setState({ role: true })
                console.log('You are Interpreter', userID);
                this.setState({ interpreterID: JSON.parse(user)._id, interpreterName: JSON.parse(user).firstName, interpreterPic: JSON.parse(user).profilePic })
                Route(record, "post", "/interpreter/get/" + `${userID}`).then(response => response.json()).then((json) => {
                    AsyncStorage.setItem('userId', userID);
                    AsyncStorage.getItem('userId').then((token) => {
                        console.log('token', token)
                    })

                }).catch((err) => {
                    ToastAndroid.show(`failed${err}`, ToastAndroid.LONG)

                })
                AsyncStorage.getItem('oldSocketID').then((Old) => {
                    console.log('Old are', Old)
                    this.setState({ oldSocketID: JSON.parse(Old) })
                })
                AsyncStorage.getItem('Active').then((token) => {
                    let record = {}
                    console.log('Active are', typeof (token))
                    if (Boolean(token) === true) {
                        record.interpreterID = this.state.interpreterID;
                        record.interpreterName = this.state.interpreterName;
                        record.interpreterPic = this.state.interpreterPic;
                        record.lat = this.state.lat;
                        record.lng = this.state.lng;
                        record.booked = false;
                        record.socketID = this.state.oldSocketID
                        Emitter('checkSocketConnectionInterpreter', record, 'interpreterActive')

                    }
                }).catch((err) => {
                    ToastAndroid.show(`failed${err}`, ToastAndroid.LONG)

                })

            } else {
                Route(record, "get", "/profile/userID/" + `${userID}`).then(response => response.json()).then((json) => {
                    
                    Emitter('registerUser', userID, 'registeredToSocket')
                    AsyncStorage.setItem('userId', userID);
                    AsyncStorage.getItem('userId').then((token) => {

                        console.log('token', token)
                    })

                }).catch((err) => {
                    ToastAndroid.show(`failed${err}`, ToastAndroid.LONG)

                })
            }
        })


    }

    render() {
        return (
            <Container>
                <Header hasTabs  >

                    <Right>
                        <Icon name='dots-vertical' size={30} style={{ color: 'white' }} onPress={this.next.bind(this)} />
                    </Right>


                </Header>
                {this.state.role === false ?
                    <Tabs>
                        <Tab heading="Calls">
                            <CallNow />
                        </Tab>

                        <Tab heading="Chat">
                            <ChatList />
                        </Tab>
                        <Tab heading="History">
                            <History />
                        </Tab>
                    </Tabs> :
                    <Tabs>
                        <Tab heading="Chat">
                            <ChatList />
                        </Tab>
                        <Tab heading="History">
                            <History />
                        </Tab>
                    </Tabs>
                    
                }




                <OfflineNotice />
              
            </Container>
        );
    }
}