import React from 'react';
import { Container, Header, Content, Form, Item, Input, Text, Body } from 'native-base';
import { StyleSheet, View, ScrollView, ToastAndroid, BackHandler } from 'react-native';
import OfflineNotice from './OfflineNotice';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Route from '../api/route';
import { Actions } from 'react-native-router-flux';
import IconTwo from 'react-native-vector-icons/Entypo';


export default class ChangePassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSubmit: true,
            oldPass: '',
            newPass: '',
            ConformPass: '',
            Matched: '',
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
    }
    GetConformPassFunction = (ConformPass) => {
        if (this.state.newPass == ConformPass) {
            this.setState({ ConformPass: ConformPass, Matched: 'yes' })
        } else {
            this.setState({ ConformPass: ConformPass, Matched: 'no' })
        }
    }
    _ResetPass() {
        console.log('new', this.state.newPass);
        console.log('conform', this.state.ConformPass);

        if (this.state.oldPass === "") {
            this.setState({ isSubmit: false });
        }
        if (this.state.newPass === "") {
            this.setState({ isSubmit: false });
        }
        if (this.state.ConformPass === "") {
            this.setState({ isSubmit: false })
        }
        if (this.state.Matched === "no") {
            this.setState({ isSubmit: false })
        }
        if (this.state.newPass.length < 8) {
            this.setState({ isSubmit: false })
        }
        if ((this.state.oldPass !== "") && (this.state.newPass !== "" && this.state.newPass.length > 7) && (this.state.ConformPass !== "" && this.state.Matched === "yes")) {

            let record = {}
            record.emailAddress = this.state.oldPass;
            record.password = this.state.newPass;
            // record.ConformPass = this.state.ConformPass;
            console.log(record);
            Route(record, "post", "/change/password").then(response => response.json()).then((json) => {
                console.log('json', json)
                if (json.code === 200) {
                    ToastAndroid.show('success', ToastAndroid.LONG)
                    Actions.Profile();
                } else {
                    ToastAndroid.show('something missing', ToastAndroid.LONG)
                    Actions.ChangePassword()
                }
            }).catch((err) => {
                ToastAndroid.show(`failed${err}`, ToastAndroid.LONG)
            })
        }
    }

    render() {
        return (
            <Container>
                <Header >
                    <Body>
                        <IconTwo name="menu" size={30} color='white' onPress={() => Actions.Profile()} />
                    </Body>
                </Header>
                <ScrollView>
                    <Content style={{ marginTop: '25%' }} >
                        <Form>
                            <Item style={styles.itemTwo} >
                                <Icon name="account-key" size={24} />
                                <Input placeholder="Old Password" secureTextEntry={true} onChangeText={(event) => this.setState({ oldPass: event })} />
                            </Item>
                            {this.state.isSubmit === false ?
                                [this.state.oldPass === "" ?
                                    <Text style={styles.error} >Please Enter Old Password</Text> : <View></View>
                                ] : <View></View>
                            }
                            <Item style={styles.itemTwo} >
                                <Icon name="key" size={24} />
                                <Input placeholder="New Password" secureTextEntry={true} onChangeText={(event) => this.setState({ newPass: event })} />
                            </Item>
                            {this.state.isSubmit === false ?
                                [this.state.newPass === "" ?
                                    <Text style={styles.error} >Please Enter Password</Text> : this.state.newPass.length < 8 ? <Text style={styles.error} >New Password atLeast 8 Character Long</Text> : <View></View>
                                ] : <View></View>
                            }
                            <Item style={styles.itemTwo} >
                                <Icon name="key-variant" size={24} />
                                <Input placeholder="Conform New Pass" secureTextEntry={true} onChangeText={ConformPass => this.GetConformPassFunction(ConformPass)} />
                            </Item>
                            {this.state.isSubmit === false ?
                                [this.state.ConformPass === "" ?
                                    <Text style={styles.error} >Please Enter Conform Password</Text> : this.state.Matched === "no" ? <Text style={styles.error} >Password Not Matched</Text> : <View></View>
                                ] : <View></View>
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
        )
    }

}
const styles = StyleSheet.create({

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