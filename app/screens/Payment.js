import React from 'react';
import { Container, Content, Header, Body, Card, CardItem } from 'native-base';
import { Text, View, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


export default class Payment extends React.Component {

    render() {
        return (
            <Container>
                <Header  >
                    <Body>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>

                            <Icon name="keyboard-backspace" size={35} color="white" style={{ marginTop: 6 }} onPress={() => Actions.Main()} />

                            <Text style={{ color: 'white', fontFamily: 'Arial', marginTop: 15, marginLeft: '25%', marginRight: '25%' }} >Payment Methods</Text>



                        </View>
                    </Body>
                </Header>
                <ScrollView>
                    <Content>
                        <Card style={{ marginLeft: '7%', width: '86%', marginTop: '10%' }}>
                            <Text style={{ backgroundColor: '#8174FA', width: '15%', height: 35, marginLeft: '85%', paddingLeft: 8, paddingTop: 1 }} ><Icon name="dots-horizontal" size={30} color="white" /> </Text>
                            <CardItem  >

                                <Body>

                                    <Text style={{ fontFamily: 'Garamond', color: '#00008B', fontWeight: 'bold', fontSize: 28, fontStyle: 'italic', marginTop: '-10%' }} >Pay<Text style={{ color: '#1A92CE' }} >Pal</Text> </Text>
                                    <Text style={{ color: '#A9A9A9', marginTop: '12%', fontFamily: 'Times' }} >myself@me.com</Text>
                                    <Text style={{ color: '#DCDCDC', marginTop: '12%', fontFamily: 'Times', marginBottom: '8%', fontSize: 10 }}>Added 15-02-2018</Text>
                                </Body>
                            </CardItem>
                        </Card>
                        <Card style={{ marginLeft: '7%', width: '86%', marginTop: '10%',  }}>
                            <Text style={{ backgroundColor: '#4CA520', width: '15%', height: 35, marginLeft: '85%', paddingLeft: 8, paddingTop: 1 }} ><Icon name="dots-horizontal" size={30} color="white" /> </Text>

                            <CardItem>
                                <Body>
                                    <Text style={{ fontFamily: 'cursive', color: '#7DD452', fontWeight: 'bolder', fontSize: 42, marginTop: '-10%' }} >easy<Text style={{ color: '#1A92CE' }} >paisa</Text> </Text>
                                    <Text style={{ color: '#696969', marginTop: '12%', fontFamily: 'serif' }} >Secure and Easy Payments</Text>
                                    <Text style={{ color: '#DCDCDC', marginTop: '12%', fontFamily: 'Times', marginBottom: '8%', fontSize: 10 }}>Added 15-09-2018</Text>


                                </Body>
                            </CardItem>
                        </Card>
                        <Card style={{ marginLeft: '7%', width: '86%', marginTop: '10%', marginBottom:'50%' }} >
                            <Text style={{ backgroundColor: '#4CA520', width: '15%', height: 35, marginLeft: '85%', paddingLeft: 8, paddingTop: 1 }} ><Icon name="dots-horizontal" size={30} color="white" /> </Text>

                            <CardItem>
                                <Body>
                                    <Text style={{ fontFamily: 'cursive', color: '#7DD452', fontWeight: 'bolder', fontSize: 42, marginTop: '-10%' }} >easy<Text style={{ color: '#1A92CE' }} >paisa</Text> </Text>
                                    <Text style={{ color: '#696969', marginTop: '12%', fontFamily: 'serif' }} >Secure and Easy Payments</Text>
                                    <Text style={{ color: '#DCDCDC', marginTop: '12%', fontFamily: 'Times', marginBottom: '8%', fontSize: 10 }}>Added 15-09-2018</Text>

                                </Body>
                            </CardItem>
                        </Card>
                        <View style={{marginBottom:'80%'}} >

                        </View>
                    </Content>
                </ScrollView>
            </Container>
        );
    }
}
