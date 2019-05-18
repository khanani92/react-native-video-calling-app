import React, { Component } from 'react'
import { View, StyleSheet, Modal, Text, TouchableOpacity } from 'react-native'
import { Container, Content } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Actions } from 'react-native-router-flux';



export default class Toasters extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: null,
      check: true,
      modalVisible: false

    }


  }
  open() {
    console.log('open');
    this.setModalVisible(true);
  }
  close() {
    console.log('close');
    this.setModalVisible(false);
  }
  connected(){
    console.log("Connected");
    this.setModalVisible(false)
    Actions.StartCall();
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    return (
      <View >
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setState({ modalVisible: false })

          }}

        >
          <Container>
            <Content style={{ backgroundColor: '#3F3D3D' }}>
              <View style={{ justifyContent: 'center', alignItems: 'center' }} >
                <Text  style={{ marginTop: '10%', color: 'white', fontFamily: 'Arial', fontSize: 22, }}  >+923352165798</Text>
                <Text  style={{ marginTop: '10%', color: 'white', fontFamily: 'Arial', fontSize: 22, }}  >Incoming Video Call...</Text>
              </View>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', marginTop: '50%', marginBottom: '0%' }}>
                <TouchableOpacity style={styles.touchbleButtonOne} onPress={this.close.bind(this)} >
                  <Icon name="phone-hangup" size={40} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.touchbleButtonTwo} onPress={this.connected.bind(this)} >
                  <Icon name="phone" size={40} color="#fff" />
                </TouchableOpacity>

              </View>

              <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', marginBottom: '15%' }}>
                <Text style={{ marginRight: '15%', color: '#fff', marginTop: "-5%" }} >Decline</Text>
                <Text style={{ marginLeft: '15%', color: '#fff', marginTop: "-5%" }}>Accept</Text>

              </View>
            </Content>
          </Container>
        </Modal>
        <TouchableOpacity onPress={this.open.bind(this)} style={{ justifyContent: 'center', alignItems: 'center', marginTop: '10%' }} >
          <Text>
            Open
          </Text>
        </TouchableOpacity>
      </View>



    )
  }
}
const styles = StyleSheet.create({
  touchbleButtonOne: {
    borderWidth: 10,
    borderColor: '#3F3D3D',
    alignItems: 'center',
    justifyContent: 'center',
    width: 90,
    height: 90,
    backgroundColor: '#D62828',
    borderRadius: 100,
    marginRight: '8%'


  },
  touchbleButtonTwo: {
    borderWidth: 10,
    borderColor: '#3F3D3D',
    alignItems: 'center',
    justifyContent: 'center',
    width: 90,
    height: 90,
    backgroundColor: '#28D65D',
    borderRadius: 100,
    marginLeft: '8%'

  },
});