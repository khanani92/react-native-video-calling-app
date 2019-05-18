import React from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Modal, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Content, Spinner } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


export default class CallNow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            spinner: false,
            loader: false,
            modalVisible: false,

        }
    }
    CallNow() {
        console.log('okkk')
        this.setState({ loader: true })
        this.setModalVisible(true)
    }
    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }
    render() {
        return (
            <Container>
                <ScrollView>
                    <Content style={{ marginTop: '30%' }} >
                        <View style={styles.buttonView} >



                            <View>
                                <Modal
                                    animationType="slide"
                                    transparent={false}
                                    visible={this.state.modalVisible}
                                    onRequestClose={() => {
                                       this.setState({modalVisible:false})
                                    }}
                                    >
                                    <View style={styles.modelView} >
                                    <Spinner color='#0000ff' size={100} />
                                    
                                        <TouchableOpacity onPress={() => { this.setModalVisible(!this.state.modalVisible); }}>
                                            <Text style={{ fontFamily: 'Times', fontSize: 18, color: '#0000ff', marginTop: '5%' }} >Searching For Available Interpreter</Text>
                                        </TouchableOpacity>
                                    </View>
                                </Modal>
                            </View>



                            <TouchableOpacity style={styles.touchbleButton} onPress={this.CallNow.bind(this)}  >
                                <Icon name="phone" size={100} color="#01a699" />
                            </TouchableOpacity>

                        </View>
                    </Content>
                </ScrollView>

            </Container>
        );
    }
}
const styles = StyleSheet.create({
    buttonIcon: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonView: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        margin: 'auto',
        paddingTop: '0%',
        height: 160
    },
    touchbleButton: {
        borderWidth: 10,
        borderColor: 'rgba(5,100,100,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        width: 158,
        height: 158,
        backgroundColor: '#fff',
        borderRadius: 100,
    },
    spinnerTextStyle: {
        color: '#FFF'
    },
    modelView:{
        height:300,
        justifyContent:'center',
        alignItems:'center',
        marginTop:'40%'
    }
});