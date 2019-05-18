import React from 'react';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Right, Footer, Body, Text, Left, Card, CardItem, Content, Item, Input, FooterTab} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconTwo from 'react-native-vector-icons/Ionicons';
import { View, StyleSheet, Image, ScrollView } from 'react-native';


import OfflineNotice from './OfflineNotice'

export default class Chat extends React.Component {
    render() {
        return (
            <Container>
                <Header>

                    <Body>

                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', }}>
                            <Left>
                                <IconTwo name="md-arrow-back" size={25} color="white" onPress={() => Actions.Main()} />
                            </Left>
                            <Image source={require('../images/baby2.jpg')} style={styles.imageStyle} />

                            <View style={{ marginLeft: 5 }} >
                                <Text style={{ fontWeight: 'bold', fontFamily: 'Arial', marginBottom: '3%', marginLeft: '2%', marginTop: '5%', color: 'white' }} >Syed Musharraf Alam</Text>


                                <View style={{ flexDirection: 'row', flexWrap: 'wrap', }}>
                                    <Text style={{ paddingRight: '3%', fontFamily: 'Arial', fontSize: 13, marginLeft: 2, color: 'white' }} >Online</Text>

                                </View>
                            </View>


                            <Right>
                                <Icon name="video-camera" size={25} color="white" />
                            </Right>
                        </View>

                    </Body>
                </Header>


                <OfflineNotice />
                <ScrollView>
                    <Content>
                        <View style={{ marginTop: 10 }} >

                        </View>
                        <View  >
                            <Card style={{ width: '75%', marginLeft: '3%', borderColor: '#124CC0', marginTop: 15, borderRadius: 10, borderBottomRightRadius: 15, borderTopRightRadius: 5 }} >
                                <CardItem style={{ backgroundColor: '#ffffff', borderWidth: 1, borderColor: '#124CC0', borderRadius: 10, borderBottomRightRadius: 15, borderTopRightRadius: 5 }}>

                                    <Body>
                                        <Text>
                                            Hello
                </Text>
                                    </Body>
                                </CardItem>
                            </Card>
                            <Card style={{ width: '75%', marginLeft: '22%', marginTop: 15, borderRadius: 10, borderBottomRightRadius: 15, borderTopRightRadius: 5 }} >
                                <CardItem style={{ backgroundColor: '#124CC0', borderRadius: 10, borderBottomRightRadius: 15, borderTopRightRadius: 5 }}>
                                    <Body>
                                        <Text style={{ color: 'white', fontFamily: 'Arial' }} >
                                            Hello
                </Text>
                                    </Body>
                                </CardItem>
                            </Card>
                            <Card style={{ width: '75%', marginLeft: '3%', borderColor: '#124CC0', marginTop: 15, borderRadius: 10, borderBottomRightRadius: 15, borderTopRightRadius: 5 }} >
                                <CardItem style={{ backgroundColor: '#ffffff', borderWidth: 1, borderColor: '#124CC0', borderRadius: 10, borderBottomRightRadius: 15, borderTopRightRadius: 5 }}>

                                    <Body>
                                        <Text>
                                            what is your name?
                </Text>
                                    </Body>
                                </CardItem>
                            </Card>
                            <Card style={{ width: '75%', marginLeft: '22%', marginTop: 15, borderRadius: 10, borderBottomRightRadius: 15, borderTopRightRadius: 5 }} >
                                <CardItem style={{ backgroundColor: '#124CC0', borderRadius: 10, borderBottomRightRadius: 15, borderTopRightRadius: 5 }}>
                                    <Body>
                                        <Text style={{ color: 'white', fontFamily: 'Arial' }} >
                                            Muhammad Yousuf
                </Text>
                                    </Body>
                                </CardItem>
                            </Card>

                            <Card style={{ width: '75%', marginLeft: '3%', borderColor: '#124CC0', marginTop: 15, borderRadius: 10, borderBottomRightRadius: 15, borderTopRightRadius: 5 }} >
                                <CardItem style={{ backgroundColor: '#ffffff', borderWidth: 1, borderColor: '#124CC0', borderRadius: 10, borderBottomRightRadius: 15, borderTopRightRadius: 5 }}>

                                    <Body>
                                        <Text>
                                            How are you?
                </Text>
                                    </Body>
                                </CardItem>
                            </Card>
                            <Card style={{ width: '75%', marginLeft: '22%', marginTop: 15, borderRadius: 10, borderBottomRightRadius: 15, borderTopRightRadius: 5 }} >
                                <CardItem style={{ backgroundColor: '#124CC0', borderRadius: 10, borderBottomRightRadius: 15, borderTopRightRadius: 5 }}>
                                    <Body>
                                        <Text style={{ color: 'white', fontFamily: 'Arial' }} >
                                            Fine
                </Text>
                                    </Body>
                                </CardItem>
                            </Card>

                            <Card style={{ width: '75%', marginLeft: '3%', borderColor: '#124CC0', marginTop: 15, borderRadius: 10, borderBottomRightRadius: 15, borderTopRightRadius: 5 }} >
                                <CardItem style={{ backgroundColor: '#ffffff', borderWidth: 1, borderColor: '#124CC0', borderRadius: 10, borderBottomRightRadius: 15, borderTopRightRadius: 5 }}>

                                    <Body>
                                        <Text>
                                            You are very good
                </Text>
                                    </Body>
                                </CardItem>
                            </Card>
                            <Card style={{ width: '75%', marginLeft: '22%', marginTop: 15, borderRadius: 10, borderBottomRightRadius: 15, borderTopRightRadius: 5 }} >
                                <CardItem style={{ backgroundColor: '#124CC0', borderRadius: 10, borderBottomRightRadius: 15, borderTopRightRadius: 5 }}>
                                    <Body>
                                        <Text style={{ color: 'white', fontFamily: 'Arial' }} >
                                            Thanks
                </Text>
                                    </Body>
                                </CardItem>
                            </Card>

                            <Card style={{ width: '75%', marginLeft: '3%', borderColor: '#124CC0', marginTop: 15, borderRadius: 10, borderBottomRightRadius: 15, borderTopRightRadius: 5 }} >
                                <CardItem style={{ backgroundColor: '#ffffff', borderWidth: 1, borderColor: '#124CC0', borderRadius: 10, borderBottomRightRadius: 15, borderTopRightRadius: 5 }}>

                                    <Body>
                                        <Text>
                                            Wellcome
                </Text>
                                    </Body>
                                </CardItem>
                            </Card>
                        </View>
                    </Content>
                </ScrollView>
                <Footer style={{ backgroundColor: '#fff' }} >
             
                                        <Item  style={{width:'93%', }} >
                        <Input placeholder='Message' style={{width:'70%',borderRadius:5, height:40, borderWidth: 1.5, borderColor: '#124CC0', marginTop:8}} />
                        <IconTwo name="md-send" size={45} color="#124CC0" style={{marginLeft:'3%', marginTop:'3%'}} />
                  
                    </Item>
                    

                </Footer>
            </Container>
        );
    }
}

const styles = StyleSheet.create({

    imageStyle: {

        marginLeft: -70,
        width: 50,
        height: 50,
        borderRadius: 100,
        borderWidth: 1,
    }

});